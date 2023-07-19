import React from 'react'
import { Table, Tag, Dropdown, Menu, Button, Popconfirm, Card } from 'antd'
import { BlogPost } from '@src/types/articlePage'
import { Link } from 'react-router-dom'
import { getBlog } from './testData'
import Title from 'antd/es/skeleton/Title'
import { Tooltip } from 'antd'
import { formatDate } from '@src/utils/format'
import ageni from '@assets/imgs/ageni.png'

type MyCardProps = {
  title: string
  summary: string
  time: Date
  tags: string[]
  cover?: string
  onClick?: () => any
}

const MyCard = ({ title, summary, tags, time, cover, onClick }: MyCardProps) => {
  return (
    <Tooltip title={title}>
      <div
        className="flex sm:flex-col lg:flex-row relative rounded-3xl shadow-lg h-full w-full p-0 overflow-hidden transform transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-3xl"
        onClick={onClick}>
        <img
          src={cover ?? ageni}
          className=" w-1/2 h-full overflow-hidden object-cover"
          alt="Card Image"
        />
        <div className="flex flex-1 flex-col pl-8 ">
          <div className="w-full h-32 pt-8">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
          </div>
          <div className="flex-1 w-full">
            <p className="text-gray-600">{summary}</p>
          </div>
          <div className="flex-1 w-full">
            <p className="text-gray-600">{formatDate(time)}</p>
          </div>
          <div className="w-full h-16">
            <div className="flex space-x-2">
              {tags.map((tag) => (
                <span key={tag} className="text-blue-500">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Tooltip>
  )
}

export default MyCard
