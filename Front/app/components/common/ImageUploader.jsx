import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { message } from 'antd';

/**
 * 通用图片上传组件
 * 
 * @param {Object} props
 * @param {Array} props.images - 已上传的图片列表 [{imageId, imageUrl, sortOrder, imageDesc}]
 * @param {Function} props.onUpload - 上传回调 (file) => Promise<imageUrl>
 * @param {Function} props.onDelete - 删除回调 (imageId) => void
 * @param {number} props.maxCount - 最大图片数量，默认10
 * @param {number} props.maxSize - 最大文件大小（MB），默认10
 */
export default function ImageUploader({ 
  images = [], 
  onUpload, 
  onDelete, 
  maxCount = 10,
  maxSize = 10 
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // 验证文件
  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSizeBytes = maxSize * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      message.error('只支持 JPG、PNG、GIF、WEBP 格式');
      return false;
    }

    if (file.size > maxSizeBytes) {
      message.error(`文件大小不能超过 ${maxSize}MB`);
      return false;
    }

    if (images.length >= maxCount) {
      message.error(`最多上传 ${maxCount} 张图片`);
      return false;
    }

    return true;
  };

  // 处理文件选择
  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    await uploadFiles(files);
    e.target.value = ''; // 清空input，允许重复上传同一文件
  };

  // 处理拖拽上传
  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    await uploadFiles(files);
  };

  // 上传文件
  const uploadFiles = async (files) => {
    for (const file of files) {
      if (!validateFile(file)) {
        continue;
      }

      setUploading(true);
      try {
        await onUpload(file);
        message.success('上传成功');
      } catch (error) {
        message.error('上传失败: ' + (error.message || '未知错误'));
      } finally {
        setUploading(false);
      }
    }
  };

  // 处理删除
  const handleDelete = (image) => {
    if (window.confirm('确定要删除这张图片吗？')) {
      onDelete(image);
    }
  };

  return (
    <div className="space-y-4">
      {/* 已上传图片列表 */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.imageId || index}
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500 transition-all"
            >
              <img
                src={image.imageUrl}
                alt={image.imageDesc || `图片 ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                <button
                  onClick={() => handleDelete(image)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs truncate">
                  {image.imageDesc || `图片 ${index + 1}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 上传区域 */}
      {images.length < maxCount && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
            dragOver
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-300 hover:border-blue-600 hover:bg-blue-50'
          }`}
        >
          <input
            type="file"
            id="image-upload"
            accept="image/jpeg,image/png,image/gif,image/webp"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            {uploading ? (
              <>
                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-gray-600 mb-1">上传中...</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <p className="text-gray-600 mb-1">点击或拖拽上传图片</p>
                <p className="text-sm text-gray-400">
                  支持 JPG、PNG、GIF 格式，最多上传{maxCount}张，单张不超过{maxSize}MB
                </p>
              </>
            )}
          </label>
        </div>
      )}

      {/* 图片计数 */}
      {images.length > 0 && (
        <div className="text-sm text-gray-500 text-center">
          已上传 {images.length} / {maxCount} 张图片
        </div>
      )}
    </div>
  );
}
