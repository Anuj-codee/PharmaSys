import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/navbar"
import Footer from "../components/footer";
import { useNavigate, useParams } from "react-router-dom";

function MedicineForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        genericName: "",
        category: "",
        manufacturer: "",
        unit: "",
        reorderLevel: 10,
        prescriptionRequired: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isEditing = Boolean(id);

    useEffect(() => {
        if (!id) return;

        const fetchMedicine = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await api.get(`/medicines/${id}`);
                setFormData({
                    name: response.data.name || "",
                    genericName: response.data.genericName || "",
                    category: response.data.category || "",
                    manufacturer: response.data.manufacturer || "",
                    unit: response.data.unit || "",
                    reorderLevel: response.data.reorderLevel ?? 10,
                    prescriptionRequired: Boolean(response.data.prescriptionRequired)
                });
            } catch (error) {
                setError(error.response?.data?.message || "Failed to load medicine");
            } finally {
                setLoading(false);
            }
        };

        fetchMedicine();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // FIX 1: Spread the previous state to retain other form fields
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // FIX 2: Corrected typo (was prevetDefault)

        try {
            setLoading(true);
            setError("");

            if (isEditing) {
                await api.put(
                    `/medicines/${id}`,
                    formData
                );
            } else {
                await api.post(
                    `/medicines`,
                    formData
                );
            }

            if (!isEditing) {
                setFormData({
                    name: "",
                    genericName: "",
                    category: "",
                    manufacturer: "",
                    unit: "",
                    reorderLevel: 10,
                    prescriptionRequired: false
                });
            }

            // Reset form on success
            navigate('/medicines')
        } catch (error) {
            setError(
                error.response?.data?.message || `Failed to ${isEditing ? "update" : "add"} medicine`
            );
        } finally {
            setLoading(false);
        }
    };

    // Shared input styling for Tailwind
    const inputClasses = "w-full px-4 py-2 mt-1 border-2 border-gray-200 rounded-lg focus:border-[#009FC6] focus:outline-none focus:ring-4 focus:ring-[#4DDCFF]/30 text-[#006179] transition-all";

    return (
        <>
            <Navbar />
            <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#00C8F9] font-sans m-6">
                <h2 className="text-3xl font-extrabold text-[#006179] mb-6">
                    {isEditing ? "Edit Medicine" : "Add New Medicine"}
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg font-medium">
                        {error}
                    </div>
                )}

                {/* FIX 3: Changed onSubmit from handleChange to handleSubmit */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-bold text-[#246879]">Medicine Name</label>
                        <input
                            name="name"
                            placeholder="e.g., Amoxicillin 500mg"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#246879]">Generic Name</label>
                        <input
                            name="genericName"
                            placeholder="e.g., Amoxicillin"
                            value={formData.genericName}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-[#246879]">Category</label>
                            <input
                                name="category"
                                placeholder="e.g., Antibiotic"
                                value={formData.category}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#246879]">Manufacturer</label>
                            <input
                                name="manufacturer"
                                placeholder="e.g., Pfizer"
                                value={formData.manufacturer}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-[#246879]">Unit</label>
                            <input
                                name="unit"
                                placeholder="e.g., Tablet, Bottle"
                                value={formData.unit}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#246879]">Reorder Level</label>
                            <input
                                type="number"
                                name="reorderLevel"
                                value={formData.reorderLevel}
                                onChange={handleChange}
                                min="0"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="flex items-center mt-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="prescriptionRequired"
                                checked={formData.prescriptionRequired}
                                onChange={handleChange}
                                className="w-5 h-5 text-[#009FC6] border-gray-300 rounded focus:ring-[#4DDCFF] cursor-pointer"
                            />
                            <span className="ml-3 text-sm font-bold text-[#246879]">
                                Prescription Required
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="relative inline-flex items-center justify-center gap-2 bg-[#009FC6] hover:bg-[#006179] disabled:bg-[#009FC6]/60 disabled:cursor-not-allowed active:scale-[0.97] text-white font-bold px-6 py-2.5 rounded-lg shadow-md transition-all duration-200 min-w-40"
                    >
                        {loading && (
                            <svg
                                className="w-4 h-4 animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12" cy="12" r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-90"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>
                        )}
                        <span>
                            {loading
                                ? "Saving..."
                                : isEditing
                                    ? "Update Medicine"
                                    : "Add Medicine"}
                        </span>
                    </button>

                    {isEditing && (
                        <button
                            type="button"
                            onClick={() => navigate("/medicines")}
                            disabled={loading}
                            className="px-6 py-2.5 rounded-lg font-bold text-[#246879] border border-gray-200 hover:border-[#009FC6] hover:text-[#009FC6] hover:bg-[#4DDCFF]/10 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            Cancel
                        </button>
                    )}

                </form>
            </div>
            <Footer />
        </>
    );
}

export default MedicineForm;
