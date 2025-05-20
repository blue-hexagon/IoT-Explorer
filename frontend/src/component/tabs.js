import React, {useEffect, useState} from "react";
import {FaRegCalendarCheck} from "react-icons/fa";

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
                tab.classList.add('border-b-transparent');
            });
        });
    });

    return (
        <div class="pt-4 flex">
            <div class="bg-white flex-grow border-2 border-gray-300 w-8/12 centered mx-32">
                <ul class="flex divide-x-2">
                    <li id="homeTab"
                        class="tab text-slate-900 flex flex-col items-center justify-center font-semibold border-b-2 border-b-transparent w-full text-sm py-3 px-6 cursor-pointer">
                        {<FaRegCalendarCheck/>}
                        Udførte Programmer
                    </li>
                    <li id="settingTab"
                        class="tab text-slate-900 flex flex-col items-center justify-center font-semibold border-b-2 border-gray-200 w-full text-sm py-3 px-6 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" class="w-[18px] h-[18px] mb-2.5"
                             viewBox="0 0 682.667 682.667">
                            <defs>
                                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                    <path d="M0 512h512V0H0Z" data-original="#000000"/>
                                </clipPath>
                            </defs>
                            <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                                      stroke-width="40"
                                      d="M256 334.666c-43.446 0-78.667-35.22-78.667-78.667 0-43.446 35.221-78.666 78.667-78.666 43.446 0 78.667 35.22 78.667 78.666 0 43.447-35.221 78.667-78.667 78.667Zm220.802-22.53-21.299-17.534c-24.296-20.001-24.296-57.204 0-77.205l21.299-17.534c7.548-6.214 9.497-16.974 4.609-25.441l-42.057-72.845c-4.889-8.467-15.182-12.159-24.337-8.729l-25.835 9.678c-29.469 11.04-61.688-7.561-66.862-38.602l-4.535-27.213c-1.607-9.643-9.951-16.712-19.727-16.712h-84.116c-9.776 0-18.12 7.069-19.727 16.712l-4.536 27.213c-5.173 31.041-37.392 49.642-66.861 38.602l-25.834-9.678c-9.156-3.43-19.449.262-24.338 8.729l-42.057 72.845c-4.888 8.467-2.939 19.227 4.609 25.441l21.3 17.534c24.295 20.001 24.295 57.204 0 77.205l-21.3 17.534c-7.548 6.214-9.497 16.974-4.609 25.441l42.057 72.845c4.889 8.467 15.182 12.159 24.338 8.729l25.834-9.678c29.469-11.04 61.688 7.561 66.861 38.602l4.536 27.213c1.607 9.643 9.951 16.711 19.727 16.711h84.116c9.776 0 18.12-7.068 19.727-16.711l4.535-27.213c5.174-31.041 37.393-49.642 66.862-38.602l25.835 9.678c9.155 3.43 19.448-.262 24.337-8.729l42.057-72.845c4.888-8.467 2.939-19.227-4.609-25.441z"
                                      data-original="#000000"/>
                            </g>
                        </svg>
                        Kørende Programmer
                    </li>
                    <li id="profileTab"
                        class="tab text-slate-900 flex flex-col items-center justify-center font-semibold border-b-2 border-gray-200 w-full text-sm py-3 px-6 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-[18px] h-[18px] mb-2.5" viewBox="0 0 512 512">
                            <path
                                d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                                data-original="#000000"/>
                        </svg>
                        Planlagte Programmer
                    </li>
                </ul>

                <div id="homeContent" class="tab-content px-6 py-12 block">
                    <h3 class="text-base font-semibold text-slate-900"></h3>
                    <p class="text-sm text-slate-600 mt-4 leading-relaxed">..</p>
                </div>
                <div id="settingContent" class="tab-content px-6 py-12 hidden">
                    <h3 class="text-base font-semibold text-slate-900">Setting content</h3>
                    <p class="text-sm text-slate-600 mt-4 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                        eiusmod tempor
                        incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Sed auctor auctor arcu, at fermentum dui. Maecenas vestibulum a turpis in lacinia. Proin aliquam
                        turpis at erat venenatis malesuada.</p>
                </div>
                <div id="profileContent" class="tab-content px-6 py-12 hidden">
                    <h3 class="text-base font-semibold text-slate-900">Profile content</h3>
                    <p class="text-sm text-slate-600 mt-4 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                        eiusmod tempor
                        incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam
                        corporis
                        suscipit laboriosam. Lorem ipsum dolor sit amet, consectetur..</p>
                </div>
            </div>
        </div>

    );
}

