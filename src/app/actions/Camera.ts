'use server'
import { cookies } from "next/headers"
import { createSessionClient } from "@/lib/server/appwrite"
import { Client, Storage, ID, ImageFormat } from "node-appwrite"
import { useUserState } from "@/lib/server/state-management/state";
import axios from "axios"

import {spawnSync} from "child_process";

export async function handleASLPredictionImage(imageDataUrl: string) {
    const pythonProcess = spawnSync('python', ["src/app/actions/CNN_MODEL/test.py"],
        {encoding: "utf8",
        input: imageDataUrl})
    // console.log(pythonProcess)
    if (pythonProcess.error) {
        return {message: "Python process failed to run.", error: pythonProcess.error.message}
    }
    else {
        console.log(pythonProcess)
        return {message: "Python process ran successfully.", prediction: pythonProcess.stdout.trim()};
    }
}