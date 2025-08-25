"use client"

import { X, Phone, Mail, MapPin } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h2>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Phone className="text-blue-600" size={20} />
            <div>
              <p className="font-medium text-gray-900">Số điện thoại</p>
              <p className="text-gray-600">+84 123 456 789</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="text-blue-600" size={20} />
            <div>
              <p className="font-medium text-gray-900">Email</p>
              <p className="text-gray-600">contact@studentmanager.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="text-blue-600" size={20} />
            <div>
              <p className="font-medium text-gray-900">Địa chỉ công ty</p>
              <p className="text-gray-600">123 Đường ABC, Quận 1, TP.HCM</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <p className="text-sm text-gray-500 text-center">Liên hệ với chúng tôi để được hỗ trợ tốt nhất!</p>
        </div>
      </div>
    </div>
  )
}
