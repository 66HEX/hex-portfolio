"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { supabase } from '@/app/utils/supabaseClient';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: number;
    title: string;
    description: string;
    image: string | null;
    githubLink: string | null;
    liveDemoLink: string | null;
    order: number;
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        image: null as File | null,
        githubLink: "",
        liveDemoLink: ""
    });
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (status === "authenticated") {
            fetchProjects().catch(console.error);
        }
    }, [status, router]);

    useEffect(() => {
        if (toastMessage) {
            const toastAnimation = gsap.fromTo(
                ".toast-message",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
            toastAnimation.play();
            setTimeout(() => {
                toastAnimation.reverse();
                setTimeout(() => setToastMessage(null), 500);
            }, 3000);
        }
    }, [toastMessage]);

    const fetchProjects = async () => {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("order", { ascending: true });

        if (error) {
            console.error("Error fetching projects:", error.message);
        } else {
            setProjects(data || []);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProject(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setNewProject(prev => ({ ...prev, image: files[0] }));
        } else {
            setNewProject(prev => ({ ...prev, image: null }));
        }
    };

    const handleAddProject = async () => {
        try {
            if (!newProject.image) {
                throw new Error('Image file is missing');
            }

            const file = newProject.image;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('project-images')
                .upload(`/${Date.now()}_${file.name}`, file);

            if (uploadError) {
                throw new Error(`Error uploading image: ${uploadError.message}`);
            }

            const publicURLBase = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;
            const publicURL = `${publicURLBase}${uploadData.path}`;

            const newOrder = (projects.length > 0 ? Math.max(...projects.map(p => p.order)) : 0) + 1;

            const projectWithImage = {
                title: newProject.title,
                description: newProject.description,
                image: publicURL,
                githubLink: newProject.githubLink,
                liveDemoLink: newProject.liveDemoLink,
                order: newOrder
            };

            const { data, error } = await supabase
                .from('projects')
                .insert([projectWithImage])
                .select();

            if (error) {
                throw new Error(`Error adding project: ${error.message}`);
            }

            if (!data || data.length === 0) {
                throw new Error('No data returned from the insert operation');
            }

            setProjects(prev => [...prev, { ...projectWithImage, id: data[0].id }]);

            setNewProject({
                title: "",
                description: "",
                image: null,
                githubLink: "",
                liveDemoLink: ""
            });

            setToastMessage("Project added successfully!");

        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occurred");
            }
        }
    };

    const handleDeleteProject = async (id: number) => {
        try {
            const { data: projectData, error: fetchError } = await supabase
                .from('projects')
                .select('image')
                .eq('id', id)
                .single();

            if (fetchError) {
                throw new Error(`Error fetching project data: ${fetchError.message}`);
            }

            if (!projectData) {
                throw new Error('Project not found');
            }

            const imagePath = projectData.image;

            const { error: deleteError } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);

            if (deleteError) {
                throw new Error(`Error deleting project: ${deleteError.message}`);
            }

            const imageName = imagePath.split('/').pop();
            const { error: storageError } = await supabase.storage
                .from('project-images')
                .remove([imageName]);

            if (storageError) {
                throw new Error(`Error deleting image from storage: ${storageError.message}`);
            }

            setProjects(prev => prev.filter(project => project.id !== id));
            setToastMessage("Project deleted successfully!");
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occurred");
            }
        }
    };

    const handleLogOut = async () => {
        try {
            await signOut({ redirect: false });
            router.push("/");
        } catch (error) {
            console.error("Error during sign out:", error);
        }
    };

    const handleOnDragEnd = async (result: any) => {
        const { destination, source } = result;

        if (!destination || destination.index === source.index) {
            return;
        }

        const updatedProjects = Array.from(projects);
        const [movedProject] = updatedProjects.splice(source.index, 1);
        updatedProjects.splice(destination.index, 0, movedProject);

        updatedProjects.forEach((project, index) => {
            project.order = index + 1;
        });

        setProjects(updatedProjects);

        try {
            for (let i = 0; i < updatedProjects.length; i++) {
                const { error } = await supabase
                    .from('projects')
                    .update({ order: i + 1 })
                    .eq('id', updatedProjects[i].id);

                if (error) {
                    throw new Error(error.message);
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error updating project order:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
        }
    };

    return (
        <section className="w-screen p-4 md:p-8 lg:p-12 xl:p-16 bg-hexwhite flex flex-col items-center">
            <button
                className="absolute top-5 left-5 text-hexblack text-base font-SupplyMono hover:underline cursor-pointer"
                onClick={handleLogOut}
            >
                ← Log Out
            </button>
            <div className="w-full max-w-7xl mx-auto flex justify-center items-center mt-12 md:mt-0">
                <h1 className="font-NeueMontreal text-4xl md:text-6xl lg:text-7xl font-black text-hexblack tracking-tight leading-none uppercase">
                    Admin Dashboard
                </h1>
            </div>

            <div className="w-full max-w-7xl mx-auto my-8 bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="font-NeueMontreal text-2xl lg:text-3xl font-bold text-hexblack">
                    Add New Project
                </h2>
                <div
                    className="mt-4 flex flex-wrap md:flex-nowrap justify-between items-center space-y-4 md:space-y-0 font-SupplyMono">
                    <input
                        type="text"
                        name="title"
                        value={newProject.title}
                        onChange={handleInputChange}
                        placeholder="Project Title"
                        className="w-full md:flex-grow px-4 py-2 text-base text-hexblack placeholder-hexlightgray border border-hexlightgray rounded-lg focus:outline-none focus:border-hexblack"
                    />
                    <input
                        type="text"
                        name="githubLink"
                        value={newProject.githubLink}
                        onChange={handleInputChange}
                        placeholder="GitHub Link"
                        className="w-full md:flex-grow px-4 py-2 text-base text-hexblack placeholder-hexlightgray border border-hexlightgray rounded-lg focus:outline-none focus:border-hexblack md:ml-4"
                    />
                    <input
                        type="text"
                        name="liveDemoLink"
                        value={newProject.liveDemoLink}
                        onChange={handleInputChange}
                        placeholder="Live Demo Link"
                        className="w-full md:flex-grow px-4 py-2 text-base text-hexblack placeholder-hexlightgray border border-hexlightgray rounded-lg focus:outline-none focus:border-hexblack md:ml-4"
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="w-full md:flex-grow px-4 py-2 text-base text-hexblack placeholder-hexlightgray border border-hexlightgray rounded-lg focus:outline-none focus:border-hexblack md:ml-4"
                    />
                </div>
                <div className="mt-4 font-SupplyMono">
        <textarea
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            placeholder="Project Description"
            className="w-full px-4 py-2 text-base text-hexblack placeholder-hexlightgray border border-hexlightgray rounded-lg focus:outline-none focus:border-hexblack"
        />
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleAddProject}
                        className="px-6 py-2 text-lg font-bold font-NeueMontreal text-white bg-hexblack rounded-lg hover:bg-hexgray focus:outline-none"
                    >
                        Add Project
                    </button>
                </div>
            </div>


            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="projects">
                    {(provided) => (
                        <div
                            className="w-full max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-4"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <h2 className="font-NeueMontreal text-2xl lg:text-3xl font-bold text-hexblack mb-6">
                                Project list
                            </h2>
                            {projects.map((project, index) => (
                                <Draggable key={project.id} draggableId={project.id.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md cursor-move"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {project.image && (
                                                <div className="mb-4 md:mb-0 md:mr-4">
                                                    <Image
                                                        src={project.image}
                                                        alt={`${project.title} image`}
                                                        width={100}
                                                        height={100}
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-1 mr-10">
                                                <h3 className="font-NeueMontreal text-xl font-semibold text-hexblack">
                                                    {project.title}
                                                </h3>
                                                <p className="font-SupplyMono text-base text-gray-700">
                                                {project.description}
                                                </p>
                                            </div>
                                            <div className="flex space-x-10 font-SupplyMono mt-4 md:mt-0">
                                                {project.githubLink && (
                                                    <a
                                                        href={project.githubLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-hexblack underline"
                                                    >
                                                        GitHub
                                                    </a>
                                                )}
                                                {project.liveDemoLink && (
                                                    <a
                                                        href={project.liveDemoLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-hexblack underline"
                                                    >
                                                        Live Demo
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteProject(project.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {toastMessage && (
                <div className="fixed bottom-5 right-5 bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg toast-message">
                    {toastMessage}
                </div>
            )}
        </section>
    );
}
