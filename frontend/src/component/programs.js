import React, {useEffect, useState} from "react";
import axios from "axios";
import {RingLoader} from "react-spinners";
import {GrClear} from "react-icons/gr";
import {FiClock, FiCalendar, FiPlayCircle, FiCheckCircle} from 'react-icons/fi';

export default function Programs(props) {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPrograms() {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
            try {
                const res = await axios.get("/active-programs/");
                console.log(res)
                const now = new Date();
                const arr = [];

                res.data.forEach((res) => {
                    const startTime = new Date(res.start_time);
                    const endTime = new Date(startTime.getTime()) + parseDuration(res.program.duration);
                    console.debug(res)
                    if (props.type === "present" && startTime <= now && now <= endTime) {
                        //present
                        arr.push(res);
                    } else if (props.type === "future" && startTime > now) {
                        //future
                        arr.push(res);
                    } else if (props.type === "past" && startTime < now) {
                        //past
                        arr.push(res);
                    }
                });
                setPrograms(arr);
            } catch (err) {
                console.error("Failed to fetch programs:", err);
            }
        }

        fetchPrograms();
    }, []);

    function parseDuration(str) {
        try {
            const [dayPart, timePart] = str.includes(" ") ? str.split(" ") : ["0", str];
            const [hh = 0, mm = 0, ss = 0] = timePart.split(":").map(Number);
            const days = parseInt(dayPart, 10);

            return (((days * 24 + hh) * 60 + mm) * 60 + ss) * 1000;
        } catch (e) {
            console.error("Invalid duration format:", str);
            return 0;
        }
    }

    function ProgramInfo({api_response}) {
        const {program, start_time} = api_response;
        const start = new Date(start_time);
        const end = new Date(new Date(start_time).getTime() + parseDuration(program.duration));

        return (
            <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                    <FiClock className="text-gray-500"/>
                    <span>Varighed: {program.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FiPlayCircle className="text-green-600"/>
                    <span>Start: {start.toLocaleString("da-DK")}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FiCheckCircle className="text-blue-600"/>
                    <span>Slut: {end.toLocaleString("da-DK")}</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="p-6 max-w-4xl mx-auto">
                <ul className="mb-8 space-y-2">
                    {loading ? (
                        <div className="flex justify-center">
                            <RingLoader color="#a9a" size={80}/>
                        </div>
                    ) : programs.length === 0 ? (

                        <div className="border border-dashed border-gray-400 p-12 rounded text-center text-gray-600">
                            <div className="text-xl">Ingen programmer fundet.</div>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {programs.map((res) => (
                                <li key={res.program.name} className="border p-3 rounded">
                                    <div className="flex justify-between">
                                        <div>
                                            <strong>{res.program.name}</strong>
                                        </div>
                                        <div>
                                            <strong>{res.program.iot_device.hostname}</strong>
                                        </div>
                                    </div>
                                    <ProgramInfo api_response={res}></ProgramInfo>
                                </li>
                            ))}
                        </ul>
                    )}
                </ul>
                <div className="flex justify-center">
                    <div className="inline-flex">
                        <button disabled className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                            Forrige Side
                        </button>
                        <button disabled className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                            Næste Side
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
