"use client";

import { useState } from "react";
import { 
  X, 
  Plus, 
  Trash2, 
  Image as ImageIcon,
  Save,
  Loader2
} from "lucide-react";
import { createProduct } from "@/lib/api";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    isSale: false,
    isNew: true,
    gender: "MEN",
    categoryName: "Wash and Wear",
    images: [{ url: "" }],
    variants: [{ size: "M", color: "White", stock: 10, sku: "" }]
  });

  const categories = ["Wash and Wear", "Cotton", "Boski", "Latha", "Khadar", "Silk"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.title || !formData.price) throw new Error("Title and Price are required");
      
      const payload = {
        ...formData,
        price: Number(formData.price),
        images: formData.images.filter(img => img.url),
        variants: formData.variants.map(v => ({ ...v, stock: Number(v.stock) }))
      };

      await createProduct(payload);
      toast.success("Product created successfully!");
      onSuccess();
      onClose();
      // Reset form
      setFormData({
        title: "",
        description: "",
        price: 0,
        isSale: false,
        isNew: true,
        gender: "MEN",
        categoryName: "Wash and Wear",
        images: [{ url: "" }],
        variants: [{ size: "M", color: "White", stock: 10, sku: "" }]
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const addImage = () => setFormData({ ...formData, images: [...formData.images, { url: "" }] });
  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const addVariant = () => setFormData({ 
    ...formData, 
    variants: [...formData.variants, { size: "M", color: "White", stock: 10, sku: "" }] 
  });
  
  const removeVariant = (index: number) => {
    const newVariants = [...formData.variants];
    newVariants.splice(index, 1);
    setFormData({ ...formData, variants: newVariants });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden max-h-full flex flex-col"
      >
        {/* Header */}
        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Add New Product</h2>
            <p className="text-slate-500 mt-1">Fill in the details to expand your catalog.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto flex-1 custom-scrollbar">
          <form id="add-product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Info */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Product Title</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Premium Cotton Suit"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Detail Description</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe the weave, fabric feel, and quality standards..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Price (PKR)</label>
                    <input 
                      required
                      type="number" 
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                    <select 
                      value={formData.gender}
                      onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none transition-all"
                    >
                      <option value="MEN">Men</option>
                      <option value="WOMEN">Women</option>
                      <option value="UNISEX">Unisex</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Variants Section */}
              <div className="pt-4 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-900">Inventory Variants</h3>
                  <button 
                    type="button"
                    onClick={addVariant}
                    className="flex items-center gap-2 text-sm font-bold text-[#1F7A63] hover:bg-[#1F7A63]/5 px-4 py-2 rounded-xl transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Variant
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.variants.map((variant, index) => (
                    <div key={index} className="flex flex-wrap md:flex-nowrap gap-4 p-6 bg-slate-50 rounded-[2rem] relative group border border-slate-100/50">
                      <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Size</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 4.5 Meter"
                          value={variant.size}
                          onChange={e => {
                            const newVariants = [...formData.variants];
                            newVariants[index].size = e.target.value;
                            setFormData({ ...formData, variants: newVariants });
                          }}
                          className="w-full px-4 py-3 bg-white border-none rounded-xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none shadow-sm"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Color</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Jet Black"
                          value={variant.color}
                          onChange={e => {
                            const newVariants = [...formData.variants];
                            newVariants[index].color = e.target.value;
                            setFormData({ ...formData, variants: newVariants });
                          }}
                          className="w-full px-4 py-3 bg-white border-none rounded-xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none shadow-sm"
                        />
                      </div>
                      <div className="w-24 space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Stock</label>
                        <input 
                          type="number" 
                          value={variant.stock}
                          onChange={e => {
                            const newVariants = [...formData.variants];
                            newVariants[index].stock = Number(e.target.value);
                            setFormData({ ...formData, variants: newVariants });
                          }}
                          className="w-full px-4 py-3 bg-white border-none rounded-xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none shadow-sm"
                        />
                      </div>
                      {formData.variants.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => removeVariant(index)}
                          className="text-rose-400 hover:text-rose-600 self-end p-3 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Image Manager */}
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-900">Gallery</h3>
                  <button 
                    type="button"
                    onClick={addImage}
                    className="text-slate-400 hover:text-[#1F7A63] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="space-y-2 relative">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white rounded-xl text-slate-400 shadow-sm">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <input 
                          type="text" 
                          placeholder="Paste image URL..."
                          value={image.url}
                          onChange={e => {
                            const newImages = [...formData.images];
                            newImages[index].url = e.target.value;
                            setFormData({ ...formData, images: newImages });
                          }}
                          className="flex-1 py-3 bg-transparent border-b border-slate-200 text-sm italic focus:border-[#1F7A63] outline-none transition-colors"
                        />
                        {formData.images.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => removeImage(index)}
                            className="text-rose-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Controls */}
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Collection Category</label>
                  <select 
                    value={formData.categoryName}
                    onChange={e => setFormData({ ...formData, categoryName: e.target.value })}
                    className="w-full px-6 py-4 bg-white border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none shadow-sm"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between p-5 bg-white rounded-2xl cursor-pointer shadow-sm group">
                    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Mark as New Entry</span>
                    <input 
                      type="checkbox" 
                      checked={formData.isNew}
                      onChange={e => setFormData({ ...formData, isNew: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-300 text-[#1F7A63] focus:ring-[#1F7A63]"
                    />
                  </label>
                  <label className="flex items-center justify-between p-5 bg-white rounded-2xl cursor-pointer shadow-sm group">
                    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Special Sale Item</span>
                    <input 
                      type="checkbox" 
                      checked={formData.isSale}
                      onChange={e => setFormData({ ...formData, isSale: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-300 text-[#1F7A63] focus:ring-[#1F7A63]"
                    />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-8 py-4 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            form="add-product-form"
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#1F7A63] text-white px-10 py-4 rounded-[1.5rem] font-bold shadow-xl shadow-[#1F7A63]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Launch Product
              </>
            )}
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
