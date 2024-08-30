"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { supabase } from '@/app/utils/supabaseClient';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: number;
    title: string;
    description: string;
    image: string | null;
    githubLink: string | null;
    liveDemoLink: string | null;
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
            .select("*");

        if (error) {
            console.error("Error fetching projects:", error.message);
        } else {
            setProjects(data || []);
        }
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProject(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setNewProject(prev => ({ ...prev, image: files[0] }));
        } else {
            // Handle the case where no files are selected or files is null
            setNewProject(prev => ({ ...prev, image: null }));
        }
    };

    const handleAddProject = async () => {
        try {
            if (!newProject.image) {
                throw new Error('Image file is missing');
            }

            const file = newProject.image;

            // Upload the image to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('project-images')
                .upload(`/${Date.now()}_${file.name}`, file);

            if (uploadError) {
                throw new Error(`Error uploading image: ${uploadError.message}`);
            }

            // Construct the public URL manually
            const publicURLBase = "https://qrpsmqlrurzqbpluvvca.supabase.co/storage/v1/object/public/project-images/";
            const publicURL = `${publicURLBase}${uploadData.path}`;

            // Insert the project into the database
            const projectWithImage = {
                title: newProject.title,
                description: newProject.description,
                image: publicURL,
                githubLink: newProject.githubLink,
                liveDemoLink: newProject.liveDemoLink,
            };

            const { data, error } = await supabase
                .from('projects')
                .insert([projectWithImage])
                .select(); // Ensure you call `.select()` to get data

            if (error) {
                throw new Error(`Error adding project: ${error.message}`);
            }

            // Check if `data` is not null and has at least one element
            if (!data || data.length === 0) {
                throw new Error('No data returned from the insert operation');
            }

            // Update the state with the new project
            setProjects(prev => [...prev, { ...projectWithImage, id: data[0].id }]);

            // Reset the new project form
            setNewProject({
                title: "",
                description: "",
                image: null,
                githubLink: "",
                liveDemoLink: ""
            });

            // Show toast message
            setToastMessage("Project added successfully!");

        } catch (error) {
            // Type guard to check if error is an instance of Error
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occurred");
            }
        }
    };

    const handleDeleteProject = async (id: number) => {
        const { data, error } = await supabase
            .from("projects")
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Error deleting project:", error.message);
        } else {
            setProjects(prev => prev.filter(project => project.id !== id));
            setToastMessage("Project deleted successfully!");
        }
    };

    const handleLogOut = async () => {
        try {
            await signOut({ redirect: false }); // Do not redirect automatically
            router.push("/");
        } catch (error) {
            console.error("Error during sign out:", error);
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
            <div className="w-full max-w-7xl mx-auto flex justify-center items-center my-12">
                <h1 className="font-NeueMontreal text-4xl md:text-6xl lg:text-7xl font-black text-hexblack tracking-tight leading-none uppercase">
                    Admin Dashboard
                </h1>
            </div>

            <div className="w-full max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-xl mb-12">
                <h2 className="font-NeueMontreal text-2xl lg:text-3xl font-bold text-hexblack mb-6">
                    Add New Project
                </h2>
                <div className="space-y-6 font-SupplyMono">
                    <input
                        type="text"
                        name="title"
                        value={newProject.title}
                        onChange={handleInputChange}
                        placeholder="Project Title"
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-hexblack transition duration-300"
                    />
                    <textarea
                        name="description"
                        value={newProject.description}
                        onChange={handleInputChange}
                        placeholder="Project Description"
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-hexblack transition duration-300"
                        rows={4}
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-hexblack transition duration-300"
                    />
                    <input
                        type="text"
                        name="githubLink"
                        value={newProject.githubLink}
                        onChange={handleInputChange}
                        placeholder="GitHub Link"
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-hexblack transition duration-300"
                    />
                    <input
                        type="text"
                        name="liveDemoLink"
                        value={newProject.liveDemoLink}
                        onChange={handleInputChange}
                        placeholder="Live Demo Link"
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-hexblack transition duration-300"
                    />
                    <button
                        onClick={handleAddProject}
                        className="bg-hexblack text-white p-4 rounded-lg font-SupplyMono text-lg shadow-md hover:bg-hexdark transition duration-300"
                    >
                        Add Project
                    </button>
                </div>
            </div>

            <div className="w-full max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
                <h2 className="font-NeueMontreal text-2xl lg:text-3xl font-bold text-hexblack mb-6">
                    Project List
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                        <thead>
                        <tr className="bg-hexblack text-white font-SupplyMono">
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Description</th>
                            <th className="p-4 text-left">Image</th>
                            <th className="p-4 text-left">GitHub Link</th>
                            <th className="p-4 text-left">Live Demo Link</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projects.map(project => (
                            <tr key={project.id} className="border-b border-gray-300 font-SupplyMono">
                                <td className="p-4">{project.title}</td>
                                <td className="p-4">{project.description}</td>
                                <td className="p-4">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            width={100}
                                            height={100}
                                            className="object-cover rounded-lg"
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td className="p-4">
                                    {project.githubLink ? (
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                                           className="text-hexblack underline">
                                            GitHub
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td className="p-4">
                                    {project.liveDemoLink ? (
                                        <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer"
                                           className="text-hexblack underline">
                                            Live Demo
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleDeleteProject(project.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {toastMessage && (
                <div className="toast-message fixed bottom-4 right-4 bg-hexblack text-hexwhite px-4 py-2 rounded-lg shadow-lg z-50">
                    {toastMessage}
                </div>
            )}
        </section>
    );
}
