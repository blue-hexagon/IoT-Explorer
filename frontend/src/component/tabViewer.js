import React, {useEffect, useState} from "react";
import {FaRegCalendarCheck} from "react-icons/fa";
import {IoCalendarNumberSharp} from "react-icons/io5";
import {FaRegClock} from "react-icons/fa";
import Programs from "./programs";

export default function TabViewer() {
    useEffect(() => {
        const tabs = document.querySelectorAll('.tab');
        const contents = document.querySelectorAll('.tab-content');

        function handleClick(e) {
            const targetId = this.id.replace('Tab', 'Content');

            contents.forEach(c => c.classList.add('hidden'));
            tabs.forEach(t => t.classList.remove('border-b-transparent'));

            document.getElementById(targetId).classList.remove('hidden');
            this.classList.add('border-b-transparent');
        }

        tabs.forEach(tab => tab.addEventListener('click', handleClick));

        return () => {
            tabs.forEach(tab => tab.removeEventListener('click', handleClick));
        };
    }, []);
    

    return (
        <div className="pt-4  mb-auto ">
            <div className="bg-white border-2 border-gray-300 w-8/12 centered flex-grow mx-auto">
                <ul className="flex divide-x-2">
                    <li id="pastProgramsTab"
                        className="tab text-slate-900 flex flex-col items-center justify-center font-semibold border-b-2 border-b-transparent w-full text-sm py-3 px-6 cursor-pointer">
                        {<FaRegCalendarCheck size={48}/>}
                        Udførte Programmer
                    </li>
                    <li id="presentProgramsTab"
                        className="tab text-slate-900 flex flex-col items-center justify-center font-semibold border-b-2 border-gray-200 w-full text-sm py-3 px-6 cursor-pointer">
                        <FaRegClock size={48}/>
                        Kørende Programmer
                    </li>
                    <li id="futureProgramsTab"
                        className="tab text-slate-900 flex flex-col items-center justify-center font-semibold border-b-2 border-gray-200 w-full text-sm py-3 px-6 cursor-pointer">
                        <IoCalendarNumberSharp size={48}/>
                        Planlagte Programmer
                    </li>
                </ul>

                <div id="pastProgramsContent" className="tab-content px-6 py-12 block">
                    <h3 className="text-base font-semibold text-slate-900"></h3>
                    <Programs type={"past"}></Programs>
                </div>
                <div id="presentProgramsContent" className="tab-content px-6 py-12 hidden">
                    <h3 className="text-base font-semibold text-slate-900"></h3>
                    <Programs type={"present"}></Programs>
                </div>
                <div id="futureProgramsContent" className="tab-content px-6 py-12 hidden">
                    <h3 className="text-base font-semibold text-slate-900"></h3>
                    <Programs type={"future"}></Programs>
                </div>
            </div>
        </div>

    );
}

