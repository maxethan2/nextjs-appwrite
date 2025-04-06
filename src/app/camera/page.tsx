'use client'
import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Button} from '@nextui-org/react'
import {useEffect, useRef, useState} from "react";
import {handleASLPredictionImage} from "@/app/actions/Camera";


export default function Camera(){
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [buttonText, setButtonText] = useState<String>("Take Photo")
    const [predictionText, setPredictionText] = useState<string>("Nothing")

    const getMediaStream = async () => {
        try {
            let stream = await navigator.mediaDevices.getUserMedia({video: true})
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            // in case that camera was activated by button click
            setButtonText("Take Photo");
        }
        catch (error) {
            console.error("Error accessing the camera: ", error);
            setButtonText("Activate Camera")
        }
    }
    useEffect(() => {
        getMediaStream();
    }, [])

    // UseEffect with setInterval to run every X seconds to take a photo
    useEffect(() => {
        const interval = setInterval(predict_ASL, 5000)
        // clean up code
        return () => {
            clearInterval(interval)
        }
    }, []);

    // get photo from camera and pass to server action
    //
    const predict_ASL = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const ctx = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageDataURL = canvas.toDataURL("image/jpeg");

            const response = await handleASLPredictionImage(imageDataURL)
            console.log(response)
        }

    }

    const cameraButton = ()=> {
        if (buttonText === "Take Photo"){
            if (videoRef.current && canvasRef.current) {
                const context = canvasRef.current.getContext("2d");
                if (context) {
                    canvasRef.current.width = videoRef.current.videoWidth;
                    canvasRef.current.height = videoRef.current.videoHeight;
                    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                }
            }
        }
        else {
            // in case that the camera is not activated already
            getMediaStream();
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-default-50 from-10% to-danger-200 to-65% text-default-800">
            <Card className="">
                <CardHeader className="">
                    <p className="m-auto">Camera</p>
                </CardHeader>
                <Divider />
                <CardBody>
                    {/* conditionally render video and canvas*/}
                    <video ref={videoRef} autoPlay className='w-full h-full object-cover object-center rounded-lg'>
                    </video>
                    <canvas ref={canvasRef} className="w-full h-full object-cover object-center rounded-lg">
                    </canvas>
                </CardBody>
                <CardFooter className="">
                    <h1>{predictionText}</h1>
                    <Button
                        className="ml-3 w-3/5 justify-center m-auto"
                        variant="shadow"
                        color='danger'
                        onClick={cameraButton}>
                        {buttonText}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}