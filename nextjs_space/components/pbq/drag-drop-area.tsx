'use client'

import { useState, useEffect } from 'react'
import { GripVertical, X, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface Item {
  id: string
  [key: string]: any
}

interface DragDropAreaProps<T extends Item> {
  availableItems: T[]
  onOrderChange: (order: string[]) => void
  renderItem: (item: T) => React.ReactNode
  disabled?: boolean
  initialOrder?: string[]
}

export function DragDropArea<T extends Item>({
  availableItems,
  onOrderChange,
  renderItem,
  disabled = false,
  initialOrder = []
}: DragDropAreaProps<T>) {
  const [availableList, setAvailableList] = useState<T[]>(availableItems)
  const [answerList, setAnswerList] = useState<T[]>([])
  const [draggedItem, setDraggedItem] = useState<T | null>(null)
  const [draggedFromAnswer, setDraggedFromAnswer] = useState(false)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  useEffect(() => {
    if (initialOrder?.length > 0) {
      const orderedItems = initialOrder
        .map(id => availableItems?.find(item => item?.id === id))
        .filter((item): item is T => item !== undefined)
      setAnswerList(orderedItems)
      const remaining = availableItems?.filter(item => !initialOrder?.includes(item?.id ?? '')) ?? []
      setAvailableList(remaining)
    }
  }, [initialOrder, availableItems])

  useEffect(() => {
    onOrderChange?.(answerList?.map(item => item?.id ?? '') ?? [])
  }, [answerList, onOrderChange])

  const handleDragStart = (item: T, fromAnswer: boolean) => {
    if (disabled) return
    setDraggedItem(item)
    setDraggedFromAnswer(fromAnswer)
  }

  const handleDragOver = (e: React.DragEvent, index?: number) => {
    e.preventDefault()
    if (index !== undefined) {
      setDragOverIndex(index)
    }
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDropToAnswer = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault()
    setDragOverIndex(null)

    if (!draggedItem || disabled) return

    if (draggedFromAnswer) {
      // Reordering within answer list
      const currentIndex = answerList?.findIndex(item => item?.id === draggedItem?.id) ?? -1
      const newList = [...(answerList ?? [])]
      newList?.splice(currentIndex, 1)
      const insertIndex = targetIndex !== undefined ? targetIndex : newList?.length ?? 0
      newList?.splice(insertIndex, 0, draggedItem)
      setAnswerList(newList)
    } else {
      // Moving from available to answer
      setAvailableList(prev => prev?.filter(item => item?.id !== draggedItem?.id) ?? [])
      const newList = [...(answerList ?? [])]
      const insertIndex = targetIndex !== undefined ? targetIndex : newList?.length ?? 0
      newList?.splice(insertIndex, 0, draggedItem)
      setAnswerList(newList)
    }

    setDraggedItem(null)
    setDraggedFromAnswer(false)
  }

  const handleDropToAvailable = (e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedItem || !draggedFromAnswer || disabled) return

    setAnswerList(prev => prev?.filter(item => item?.id !== draggedItem?.id) ?? [])
    setAvailableList(prev => [...(prev ?? []), draggedItem])
    setDraggedItem(null)
    setDraggedFromAnswer(false)
  }

  const handleRemoveFromAnswer = (itemId: string) => {
    if (disabled) return
    const item = answerList?.find(i => i?.id === itemId)
    if (item) {
      setAnswerList(prev => prev?.filter(i => i?.id !== itemId) ?? [])
      setAvailableList(prev => [...(prev ?? []), item])
    }
  }

  const handleReset = () => {
    if (disabled) return
    setAnswerList([])
    setAvailableList(availableItems)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Available Items */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-900">Available Items</h3>
          <span className="text-sm text-slate-500">{availableList?.length ?? 0} remaining</span>
        </div>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-4 min-h-[400px] bg-slate-50",
            !disabled && "hover:border-slate-400"
          )}
          onDragOver={handleDragOver}
          onDrop={handleDropToAvailable}
          onDragLeave={handleDragLeave}
        >
          <div className="space-y-2">
            {availableList?.length === 0 ? (
              <p className="text-center text-slate-400 py-8">All items have been placed</p>
            ) : (
              availableList?.map(item => (
                <div
                  key={item?.id}
                  draggable={!disabled}
                  onDragStart={() => handleDragStart(item, false)}
                  className={cn(
                    "cursor-move bg-white border-2 border-slate-200 rounded-lg p-3 shadow-sm",
                    !disabled && "hover:border-blue-400 hover:shadow-md transition-all"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">{renderItem?.(item)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Answer Area */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-900">Your Answer (Order matters)</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={disabled || answerList?.length === 0}
            className="text-xs"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        </div>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-4 min-h-[400px]",
            answerList?.length === 0 ? "bg-blue-50 border-blue-300" : "bg-white border-slate-300",
            !disabled && "hover:border-blue-500"
          )}
          onDragOver={e => handleDragOver(e)}
          onDrop={e => handleDropToAnswer(e)}
          onDragLeave={handleDragLeave}
        >
          {answerList?.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-blue-600 font-medium">Drag items here to build your answer</p>
            </div>
          ) : (
            <div className="space-y-2">
              {answerList?.map((item, index) => (
                <div key={item?.id}>
                  {/* Drop zone before item */}
                  <div
                    className={cn(
                      "h-2 -mb-2 transition-all",
                      dragOverIndex === index && "h-8 bg-blue-200 rounded mb-0"
                    )}
                    onDragOver={e => handleDragOver(e, index)}
                    onDrop={e => handleDropToAnswer(e, index)}
                  />
                  <div
                    draggable={!disabled}
                    onDragStart={() => handleDragStart(item, true)}
                    className={cn(
                      "bg-white border-2 border-blue-500 rounded-lg p-3 shadow-md",
                      !disabled && "cursor-move hover:shadow-lg transition-all"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white text-xs font-bold rounded">
                          {index + 1}
                        </span>
                        <GripVertical className="h-5 w-5 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">{renderItem?.(item)}</div>
                      {!disabled && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFromAnswer(item?.id ?? '')}
                          className="flex-shrink-0 h-6 w-6 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {/* Drop zone after last item */}
              <div
                className={cn(
                  "h-2 transition-all",
                  dragOverIndex === answerList?.length && "h-8 bg-blue-200 rounded"
                )}
                onDragOver={e => handleDragOver(e, answerList?.length)}
                onDrop={e => handleDropToAnswer(e, answerList?.length)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
