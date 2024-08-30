"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialProjects = [
    {
        title: "Gym Website",
        description: "Created a powerful online presence for powerlifting enthusiasts.",
        image: "/works/leanbulls-resized.webp",
        githubLink: "https://github.com/66HEX/lean-bulls-gym",
        liveDemoLink: "https://66hex.github.io/lean-bulls-gym/"
    },
    {
        title: "Logo Design",
        description: "Designed a fresh and distinctive logo to enhance brand identity.",
        image: "/works/logo-resized.webp"
    },
    {
        title: "E-commerce Store",
        description: "Launched a seamless online shopping experience using Shopify.",
        image: "/works/natalia-resized.webp",
        liveDemoLink: "https://nataliajasinska.pl/"
    },
    {
        title: "Sponsorship Proposal",
        description: "Designed an eye-catching sponsorship proposal.",
        image: "/works/sponsorship-resized.webp",
    },
    {
        title: "Landing Page",
        description: "Designed an impactful landing page highlighting marketing solutions.",
        image: "/works/mocommerce-resized.webp",
        githubLink: "https://github.com/66HEX/mo-commerce",
        liveDemoLink: "https://mocommerce.pl/"
    }
];

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [projects, setProjects] = useState(initialProjects);
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        image: "",
        githubLink: "",
        liveDemoLink: ""
    });

    useEffect(() => {
        console.log("Session status:", status); // Debug session status
        if (status === "unauthenticated") {
            console.log("Redirecting to /admin/login due to unauthenticated status.");
            router.push("/admin/login");
        }
    }, [status, router]);

    if (status === "loading") {
        console.log("Loading session...");
        return <div>Loading...</div>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(`Input change - Name: ${name}, Value: ${value}`); // Debug input changes
        setNewProject(prev => ({ ...prev, [name]: value }));
    };

    const handleAddProject = () => {
        console.log("Adding new project:", newProject); // Debug project addition
        setProjects(prev => [...prev, newProject]);
        setNewProject({
            title: "",
            description: "",
            image: "",
            githubLink: "",
            liveDemoLink: ""
        });
    };

    const handleDeleteProject = (index: number) => {
        console.log(`Deleting project at index: ${index}`); // Debug project deletion
        setProjects(prev => prev.filter((_, i) => i !== index));
    };

    const handleLogOut = async () => {
        try {
            await signOut({ redirect: false }); // Do not redirect automatically

            router.push("/");
        } catch (error) {
        }
    };

    return (
        <section className="w-screen p-4 md:p-8 lg:p-12 xl:p-16 bg-hexwhite flex flex-col items-center">
            <button className="absolute top-5 left-5 text-hexblack text-base font-SupplyMono hover:underline cursor-pointer"
                    onClick={handleLogOut}>
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
                        type="text"
                        name="image"
                        value={newProject.image}
                        onChange={handleInputChange}
                        placeholder="Image URL"
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
                        {projects.map((project, index) => (
                            <tr key={index} className="border-b border-gray-300 font-SupplyMono">
                                <td className="p-4">{project.title}</td>
                                <td className="p-4">{project.description}</td>
                                <td className="p-4">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        width={100}
                                        height={60}
                                        className="rounded-lg"
                                    />
                                </td>
                                <td className="p-4">
                                    {project.githubLink ? (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-hexblack underline"
                                        >
                                            GitHub
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td className="p-4">
                                    {project.liveDemoLink ? (
                                        <a
                                            href={project.liveDemoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-hexblack underline"
                                        >
                                            Live Demo
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleDeleteProject(index)}
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
        </section>
    );
}