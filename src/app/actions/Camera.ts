'use server'
import { cookies } from "next/headers"
import { createSessionClient } from "@/lib/server/appwrite"
import { Client, Storage, ID, ImageFormat } from "node-appwrite"
import { useUserState } from "@/lib/server/state-management/state";
import axios from "axios"

import {spawnSync} from "child_process";

export async function handleASLPredictionImage(imageDataUrl: string) {
    const pythonPath = 'C:\\Users\\me03h\\AppData\\Local\\Programs\\Python\\Python311\\python.exe'
    const pythonProcess = spawnSync(pythonPath, ["src/app/actions/CNN_MODEL/ASL_CNN_Single_Prediction.py"],
        {encoding: "utf8",
        input: imageDataUrl})

    // console.log("STDOUT:", pythonProcess.stdout);
    // console.log("STDERR:", pythonProcess.stderr);
    // console.log("EXIT CODE:", pythonProcess.status);

    if (pythonProcess.error) {
        return {message: "Python process failed to run.", error: pythonProcess.error.message}
    }
    else {
        console.log(pythonProcess)
        return {message: "Python process ran successfully.", prediction: pythonProcess.stdout.trim()};
    }
}