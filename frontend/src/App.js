import React, {useEffect, useState} from "react";
import axios from "axios";

export default function ActiveProgramsViewer() {
    const [pastPrograms, setPastPrograms] = useState([]);
    const [activePrograms, setActivePrograms] = useState([]);
    const [futurePrograms, setFuturePrograms] = useState([]);

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

                <h1 className="text-2xl font-bold mb-4">Udførte Programmer</h1>
                <ul className="mb-8 space-y-2">
                    {pastPrograms.map((res) => (
                        <li key={res.program.name} className="border p-3 rounded">
                            <strong>{res.program.name}</strong> kører på <em>{res.iot_device.hostname}</em>
                            <br/> Startet: {new Date(res.start_time).toLocaleString("da-DK")}
                            <br/> Slutter: {new Date(parseDuration(res.start_time) + parseDuration(res.program.duration)).toLocaleString("da-DK")}
                            {/*<br/> Varighed: {Date(new Date(parseDuration(res.program.duration))- Date.now()).toLocaleString("da-DK")}*/}
                        </li>
                    ))}
                </ul>
                <h1 className="text-2xl font-bold mb-4">Kørende Programmer</h1>
                <ul className="mb-8 space-y-2">
                    {activePrograms.map((res) => (
                        <li key={res.program.name} className="border p-3 rounded">
                            <strong>{res.program.name}</strong> kører på <em>{res.iot_device.hostname}</em>
                            <br/> Startet: {new Date(res.start_time).toLocaleString("da-DK")}
                        </li>
                    )) ?? <h1>sss</h1>}
                </ul>

                <h2 className="text-xl font-semibold mb-2">Planlagte Programmer</h2>
                <ul className="space-y-2">
                    {futurePrograms.map((res) => (
                        <li key={res.program.name} className="border p-3 rounded bg-gray-50">
                            <strong>{res.program.name}</strong> planlagt til <em>{res.iot_device.hostname}</em>
                            <br/> Starter: {new Date(res.start_time).toLocaleString("da-DK")}
                        </li>
                    ))}
                </ul>

            </div>
        </>
    );
}
