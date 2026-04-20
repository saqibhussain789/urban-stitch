"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Image as ImageIcon 
} from "lucide-react";
import { createProduct } from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
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
      // Basic validation
      if (!formData.title || !formData.price) throw new Error("Title and Price are required");
      
      const payload = {
        ...formData,
        price: Number(formData.price),
        images: formData.images.filter(img => img.url),
        variants: formData.variants.map(v => ({ ...v, stock: Number(v.stock) }))
      };

      await createProduct(payload);
      toast.success("Product created successfully!");
      router.push("/admin/products");
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

  return (
    <div className="space-y-10 pb-20">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/products"
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Add New Product</h1>
          <p className="text-slate-500 mt-2">Create a new item in your catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Product Information</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 ml-1">Title</label>
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
              <label className="text-sm font-bold text-slate-500 ml-1">Description</label>
              <textarea 
                rows={4}
                placeholder="Describe the fabric quality, weave, and feel..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">Price (PKR)</label>
                <input 
                  required
                  type="number" 
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">Gender</label>
                <select 
                  value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none transition-all"
                >
                  <option value="MEN">Men</option>
                  <option value="WOMEN">Women</option>
                  <option value="UNISEX">Unisex</option>
                </select>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900">Inventory Variants</h3>
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
                <div key={index} className="flex flex-wrap md:flex-nowrap gap-4 p-6 bg-slate-50 rounded-[2rem] relative group">
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Size</label>
                    <input 
                      type="text" 
                      placeholder="e.g. L"
                      value={variant.size}
                      onChange={e => {
                        const newVariants = [...formData.variants];
                        newVariants[index].size = e.target.value;
                        setFormData({ ...formData, variants: newVariants });
                      }}
                      className="w-full px-4 py-3 bg-white border-none rounded-xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Color</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Navy"
                      value={variant.color}
                      onChange={e => {
                        const newVariants = [...formData.variants];
                        newVariants[index].color = e.target.value;
                        setFormData({ ...formData, variants: newVariants });
                      }}
                      className="w-full px-4 py-3 bg-white border-none rounded-xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none"
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
                      className="w-full px-4 py-3 bg-white border-none rounded-xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none"
                    />
                  </div>
                  {formData.variants.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="absolute -top-2 -right-2 bg-white text-rose-500 p-2 rounded-full shadow-md border border-rose-100 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Images */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900">Images</h3>
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
                <div key={index} className="space-y-2 relative group">
                   <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Image URL..."
                      value={image.url}
                      onChange={e => {
                        const newImages = [...formData.images];
                        newImages[index].url = e.target.value;
                        setFormData({ ...formData, images: newImages });
                      }}
                      className="flex-1 py-3 bg-transparent border-b border-slate-100 text-sm italic focus:border-[#1F7A63] outline-none transition-colors"
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
            
            <p className="text-[10px] text-slate-400 leading-relaxed italic">
              * Note: Please use high-quality image URLs. For local testing, you can use placeholder services or upload to a CDN.
            </p>
          </div>

          {/* Status & Category */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 ml-1">Category</label>
              <select 
                value={formData.categoryName}
                onChange={e => setFormData({ ...formData, categoryName: e.target.value })}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none transition-all"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm font-bold text-slate-700">Mark as New</span>
              </div>
              <input 
                type="checkbox" 
                checked={formData.isNew}
                onChange={e => setFormData({ ...formData, isNew: e.target.checked })}
                className="w-5 h-5 rounded border-slate-300 text-[#1F7A63] focus:ring-[#1F7A63]"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-sm font-bold text-slate-700">Sale Event</span>
              </div>
              <input 
                type="checkbox" 
                checked={formData.isSale}
                onChange={e => setFormData({ ...formData, isSale: e.target.checked })}
                className="w-5 h-5 rounded border-slate-300 text-[#1F7A63] focus:ring-[#1F7A63]"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#1F7A63] text-white py-5 rounded-[1.5rem] font-bold shadow-xl shadow-[#1F7A63]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
            >
              {loading ? "Creating..." : "Save Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
