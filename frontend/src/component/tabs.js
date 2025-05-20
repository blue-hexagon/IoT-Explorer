import React, {useEffect, useState} from "react";
import {FaRegCalendarCheck} from "react-icons/fa";
import {IoCalendarNumberSharp} from "react-icons/io5";
import {FaRegClock} from "react-icons/fa";
import ActiveProgramsViewer from "../App";

export default function Tabs() {

    useEffect(() => {
        let tabs = document.querySelectorAll('.tab');
        let contents = document.querySelectorAll('.tab-content');

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function (e) {
                let targetId = tab.id.replace('Tab', 'Content');
                contents.forEach(function (content) {
                    content.classList.add('hidden');
                });
                tabs.forEach(function (tab) {
                    tab.classList.remove('border-b-transparent');
                });
                document.getElementById(targetId).classList.remove('hidden');
                document.getElementById(targetId).classList.add('block');
                tab.classList.add('border-b-transparent');
            });
        });
    });

    return (
        <div className="pt-4  mb-auto ">
            <div className="bg-white border-2 border-gray-300 w-8/12 centered flex-grow mx-auto">
                <ul className="flex divide-x-2">
                    <li id="doneProgramsTab"
                        className="tab text-slate-900 flex flex-col items-center justify-center font-semibold border-b-2 border-b-transparent w-full text-sm py-3 px-6 cursor-pointer">
                        {<FaRegCalendarCheck size={48}/>}
                        Udførte Programmer
                    </li>
                    <li id="currentProgramsTab"
                        className="tab text-slate-900 flex flex-col items-center justify-center font-semibold border-b-2 border-gray-200 w-full text-sm py-3 px-6 cursor-pointer">
                        <FaRegClock size={48}/>
                        Kørende Programmer
                    </li>
                    <li id="pastProgramsTab"
                        className="tab text-slate-900 flex flex-col items-center justify-center font-semibold border-b-2 border-gray-200 w-full text-sm py-3 px-6 cursor-pointer">
                        <IoCalendarNumberSharp size={48}/>
                        Planlagte Programmer
                    </li>
                </ul>

                <div id="doneProgramsContent" className="tab-content px-6 py-12 block">
                    <h3 className="text-base font-semibold text-slate-900"></h3>
                    <ActiveProgramsViewer type={"past"}></ActiveProgramsViewer>
                </div>
                <div id="currentProgramsContent" className="tab-content px-6 py-12 hidden">
                    <h3 className="text-base font-semibold text-slate-900"></h3>
                    <ActiveProgramsViewer type={"current"}></ActiveProgramsViewer>
                </div>
                <div id="pastProgramsContent" className="tab-content px-6 py-12 hidden">
                    <h3 className="text-base font-semibold text-slate-900"></h3>
                    <ActiveProgramsViewer type={"previous"}></ActiveProgramsViewer>
                </div>
            </div>
        </div>

    );
}

