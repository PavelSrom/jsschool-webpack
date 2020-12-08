import React from "react"

export function Post({ title, body, onDelete }) {
  return (
    <div className="bg-white shadow-md mt-6 p-2 w-full">
      <div className="flex justify-between items-center">
        <h4 className="text-xl mb-4">{title}</h4>
        <p className="text-xs cursor-pointer" onClick={onDelete}>
          Delete
        </p>
      </div>
      <p className="text-base">{body}</p>
    </div>
  )
}
