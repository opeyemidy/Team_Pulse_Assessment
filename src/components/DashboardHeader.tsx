"use client"

import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/actions/auth";


export function DashboardHeader() {
    const router = useRouter()
    return (
        <header className="h-16 border-b border-border bg-card flex items-center px-6 shadow-sm">
            <SidebarTrigger className="text-foreground hover:bg-accent" />
            <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h1 className="text-lg font-semibold text-foreground">TeamPulse</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            AD
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <div className="flex items-center justify-start gap-2 p-2">
                                    <div className="flex flex-col space-y-1 leading-none">
                                        <p className="font-medium">Admin User</p>
                                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                                            admin@teampulse.dev
                                        </p>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.push("/settings")}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <form action={logoutAction} className="p-0 m-0">
                                        <button
                                            type="submit"
                                            className="flex gap-2 w-full cursor-pointer"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log out
                                        </button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    )
}