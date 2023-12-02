
"use client"
import { getData } from '@/libs/data';
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react';

export default function Navbar(props: { userData: any }) {

  return (
    <nav className="flex items-center outline outline-green outline-1 p-3 pl-10 select-none">
      <h1 className="text-xl hover:text-green transition-all">accord</h1>
      <div className="flex ml-20">
        <a href="#" className="p-2 transition-all">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="hover:text-green">stats</Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-black divide-y divide-gray-100 shadow-lg border-1 border border-green focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${active && 'bg-green'} group flex items-center w-full px-2 py-2 text-sm`}>
                        <span className="mr-2">coins</span>
                        <span className="ml-auto font-mono">{props.userData.coins}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${active && 'bg-green'} group flex items-center w-full px-2 py-2 text-sm`}>
                        <span className="mr-2">reputation</span>
                        <span className="ml-auto font-mono">{props.userData.reputation}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${active && 'bg-green'} group flex items-center w-full px-2 py-2 text-sm`}>
                        <span className="mr-2">personality</span>
                        <span className="ml-auto font-mono">{props.userData.personality}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${active && 'bg-green'} group flex items-center w-full px-2 py-2 text-sm`}>
                        <span className="mr-2">intelligence</span>
                        <span className="ml-auto font-mono">{props.userData.intelligence}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${active && 'bg-green'} group flex items-center w-full px-2 py-2 text-sm`}>
                        <span className="mr-2">potential</span>
                        <span className="ml-auto font-mono">{props.userData.potential}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${active && 'bg-green'} group flex items-center w-full px-2 py-2 text-sm`}>
                        <span className="mr-2">rating</span>
                        <span className="ml-auto font-mono">{props.userData.rating}</span>
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </a>

        <span className="p-2">
          <label className="text-green">Coins:</label>
          <span className="ml-2">{props.userData.coins}</span>
        </span>
      </div>
      <div className="flex ml-auto">
        <button className="bg-green p-2 outline-none border-none">
          reset
        </button>
      </div>
    </nav>
  )
}