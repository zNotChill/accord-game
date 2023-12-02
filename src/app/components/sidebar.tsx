import { Tab } from "@headlessui/react"
import React from "react"
import Shop from "./shop"

export default function Sidebar( props: { userData: any }) {
  
  return (
    <Tab.Group
      onChange={(index) => {
        console.log('Changed selected tab to:', index)
      }}
    >
      <section className="relative select-none">
        <section className="flex flex-col flex-1 outline outline-green outline-1 mt-5 w-60 absolute">
          <Tab.List className="flex flex-col">
            <Tab className="hover:bg-green transition-all flex w-auto">
              <a href="#" className="p-5 pt-5 transition-all">
                Shop
              </a>
            </Tab>
            <Tab className="hover:bg-green transition-all flex w-auto">
              <a href="#" className="p-5 pt-5 transition-all">
                Help
              </a>
            </Tab>
            <Tab className="hover:bg-green transition-all flex w-auto">
              <a href="#" className="p-5 pt-5 transition-all">
                Settings
              </a>
            </Tab>
          </Tab.List>
        </section>
        <section className="flex flex-col flex-1 mt-5 w-60 ml-64">
          <Tab.Panels>
            <Tab.Panel><Shop userData={props.userData} /></Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </section>
      </section>
    </Tab.Group>
    // <section className="flex flex-col flex-1">
    //   <section className="flex flex-col flex-1 outline outline-green outline-1 mt-5 w-60">
    //   </section>
    //   <div className="text-sm text-gray-400 mt-auto">
    //     Made with <span className="text-green">♥</span> by <a className="text-green" href="https://github.com/zNotChill">zNotChill</a>
    //   </div>
    // </section>
  )
}