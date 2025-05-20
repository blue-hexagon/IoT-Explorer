import React, {useEffect, useState} from "react";
import axios from "axios";
import {RingLoader} from "react-spinners";

export default function ActiveProgramsViewer(props) {
    const [pastPrograms, setPastPrograms] = useState([]);
    const [activePrograms, setActivePrograms] = useState([]);
    const [futurePrograms, setFuturePrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        // Simulate async loading
        setTimeout(() => {
            setData("Loaded content!");
            setLoading(false);
        }, 2000);
    }, []);
    useEffect(() => {
        async function fetchPrograms() {
            try {
                const res = await axios.get("/active-programs/");
                const now = new Date();

                const past = [];
                const active = [];
                const future = [];

                res.data.forEach((res) => {
                    const startTime = new Date(res.start_time);
                    const endTime = new Date(startTime.getTime()) + parseDuration(res.program.duration);
                    console.log(res)
                    console.debug(res)
                    if (startTime <= now && now <= endTime) {
                        active.push(res);
                    } else if (startTime > now) {
                        future.push(res);
                    } else {
                        past.push(res);
                    }
                });
                setActivePrograms(active);
                setFuturePrograms(future);
                setPastPrograms(past);
            } catch (err) {
                console.error("Failed to fetch programs:", err);
            }
        }

        fetchPrograms();
    }, []);

    function parseTimeDelta(str) {//*
        try {
            const [dayPart, timePart] = str.split(" ");
            const [hh, mm, ss] = (timePart || dayPart).split(":").map(Number);
            const days = timePart ? parseInt(dayPart) : 0;

            return (
                (((days * 24 + hh) * 60 + mm) * 60 + ss) * 1000
            );
        } catch (e) {
            const [hh, mm, ss] = (str).split(":").map(Number);

            return (
                (((24 + hh) * 60 + mm) * 60 + ss) * 1000
            );
        }
    }

    function EndTime({start, duration}) { //*
        const deltaMs = parseTimeDelta(duration);
        const end = new Date(new Date(start).getTime() + deltaMs);

        return (
            <p>Sluttid: {end.toLocaleString("da-DK")}</p>
        );
    }

    function parseDuration(durationStr) {
        try {
            const [days, time] = durationStr.split(' ');
            const [hours, minutes, seconds] = time.split(':').map(Number);
            const total_ms =
                (parseInt(days) * 24 * 60 * 60 * 1000) +
                (hours * 60 * 60 * 1000) +
                (minutes * 60 * 1000) +
                (seconds * 1000);

            console.log(total_ms)
            return total_ms
        } catch (err) {
            const [hours, minutes, seconds] = durationStr.split(':').map(Number);
            const total_ms =
                (hours * 60 * 60 * 1000) +
                (minutes * 60 * 1000) +
                (seconds * 1000);

            console.log(total_ms)
            return total_ms
        }

    }

    return (
        <>
            <div className="p-6 max-w-4xl mx-auto">
                <ul className="mb-8 space-y-2">
                    {props.type === "past" && loading ? (
                        <div className="flex justify-center"><RingLoader color="#a9a" size={80}/></div>
                    ) : (
                        pastPrograms.map((res) => (
                            <li key={res.program.name} className="border p-3 rounded">
                                <strong>{res.program.name}</strong> kører på <em>{res.iot_device.hostname}</em>
                                <br/> Start: {new Date(res.start_time).toLocaleString("da-DK")}
                                {/*<br/> Slut: {EndTime(res.start_time, res.program.duration)}*/}
                                <br/> Varighed: {new Date(parseDuration(res.program.duration)).toLocaleTimeString("da-DK")}
                            </li>
                        )))}
                    {props.type === "current" && loading ? (
                        <div className="flex justify-center"><RingLoader color="#a9a" size={80}/></div>
                    ) : (activePrograms.map((res) => (
                        <li key={res.program.name} className="border p-3 rounded">
                            <strong>{res.program.name}</strong> kører på <em>{res.iot_device.hostname}</em>
                            <br/> Startet: {new Date(res.start_time).toLocaleString("da-DK")}
                        </li>
                    )))}
                    {props.type === "previous" && loading ? (
                        <div className="flex justify-center"><RingLoader color="#a9a" size={80}/></div>
                    ) : (futurePrograms.map((res) => (
                        <li key={res.program.name} className="border p-3 rounded bg-gray-50">
                            <strong>{res.program.name}</strong> planlagt til <em>{res.iot_device.hostname}</em>
                            <br/> Starter: {new Date(res.start_time).toLocaleString("da-DK")}
                        </li>
                    )))}
                </ul>
                <div className="flex justify-center">
                    <div className="inline-flex">
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                            Forrige Side
                        </button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                            Næste Side
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
