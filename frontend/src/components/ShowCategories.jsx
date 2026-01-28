import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useEventStore } from "../utils/useAuthStore.jsx";

/* -------------------- Constants -------------------- */

const emptyEvent = {
  title: "",
  description: "",
  duration: "",
  venue: "",
  date: "",
  available_seats: ""
  
};

/* -------------------- Component -------------------- */

const ShowCategories = () => {
  const {
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    addEvent,
    updateEvent,
    deleteEvent
  } = useEventStore();

  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [showEventModal, setShowEventModal] = useState(false);
  const [isEditEvent, setIsEditEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [eventForm, setEventForm] = useState(emptyEvent);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryToEdit, setCategoryToEdit] = useState(null);


  const normalizeCategories = (raw = []) =>
    raw.map(cat => ({
      category_id: cat._id,
      category_name: cat.category_name,
      events: (cat.categories || []).map(ev => ({
        event_id: ev._id,
        title: ev.title,
        description: ev.description,
        duration: ev.duration,
        venue: ev.venue,
        date: ev.date,
        available_seats: ev.available_seats
      }))
    }));

  /* -------------------- Fetch -------------------- */

  const loadCategories = async () => {
    setLoading(true);
    const res = await fetchCategories();

    const normalized = normalizeCategories(res?.data || []);
    setCategories(normalized);
    setSelectedCategory(normalized[0] || null);

    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  /* -------------------- Event Handlers -------------------- */

  const openAddEvent = () => {
    setIsEditEvent(false);
    setEventForm(emptyEvent);
    setShowEventModal(true);
  };

  const openEditEvent = (event) => {
    setIsEditEvent(true);
    setEventToEdit(event);
    setEventForm({
      ...event,
      date: toInputDate(event.date)
    });
    setShowEventModal(true);
  };
  

  const saveEvent = async () => {
    if (!selectedCategory) return;

    if (isEditEvent) {
      await updateEvent(
        selectedCategory.category_id,
        eventToEdit.event_id,
        eventForm
      );
    } else {
      await addEvent(
        selectedCategory.category_id,
        eventForm
      );
    }

    await loadCategories();
    setShowEventModal(false);
  };
 
  const toInputDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  
 
  

  const openAddCategory = () => {
    setCategoryToEdit(null);
    setCategoryName("");
    setShowCategoryModal(true);
  };

  const openEditCategory = (cat) => {
    setCategoryToEdit(cat);
    setCategoryName(cat.category_name);
    setShowCategoryModal(true);
  };

  const saveCategory = async () => {
    if (!categoryName.trim()) return;

    if (categoryToEdit) {
      await updateCategory(categoryToEdit.category_id, {
        category_name: categoryName
      });
    } else {
      await addCategory({ category_name: categoryName });
    }

    await loadCategories();
    setShowCategoryModal(false);
  };

  const removeCategory = async (cat) => {
    await deleteCategory(cat.category_id);
    await loadCategories();
  };

  /* -------------------- States -------------------- */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-20 animate-spin" />
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-lg text-gray-500">
          No categories available
        </p>
        <button
          onClick={openAddCategory}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          + Add Category
        </button>

        {showCategoryModal && CategoryModal()}
      </div>
    );
  }

  /* -------------------- UI -------------------- */

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <button
            onClick={openAddCategory}
            className="bg-blue-600 px-2 py-1 rounded text-sm"
          >
            + Add
          </button>
        </div>

        <div className="space-y-2">
          {categories.map(cat => (
            <div
              key={cat.category_id}
              onClick={() => setSelectedCategory(cat)}
              className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer
                ${
                  selectedCategory?.category_id === cat.category_id
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
            >
              <span>{cat.category_name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openEditCategory(cat);
                }}
              >
                ✏️
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {selectedCategory.category_name} Events
          </h1>
          <button
            onClick={openAddEvent}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Event
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCategory.events.map(event => (
            <div key={event.event_id} className="bg-white p-5 rounded shadow">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-blue-600">{event.description}</p>

              <div className="text-sm text-gray-500 mt-2">
                <p>Date: {event.date}</p>
                <p>Venue: {event.venue}</p>
                <p>Duration: {event.duration}</p>
                <p>Seats: {event.available_seats}</p>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openEditEvent(event)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    deleteEvent(
                      selectedCategory.category_id,
                      event.event_id
                    ).then(loadCategories)
                  }
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modals */}
      {showEventModal && EventModal()}
      {showCategoryModal && CategoryModal()}
    </div>
  );

  /* -------------------- Modals -------------------- */

  function EventModal() {
    return (
      <Modal title={isEditEvent ? "Edit Event" : "Add Event"}>
        {Object.keys(emptyEvent).map(key => (
          <input
            key={key}
            type={key === "date" ? "date" : "text"}
            placeholder={key.replace("_", " ")}
            value={eventForm[key]}
            onChange={(e) =>
              setEventForm({ ...eventForm, [key]: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />
        ))}
        <ModalActions
          onCancel={() => setShowEventModal(false)}
          onSave={saveEvent}
        />
      </Modal>
    );
  }

  function CategoryModal() {
    return (
      <Modal title={categoryToEdit ? "Edit Category" : "Add Category"}>
        <input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Category name"
        />
        <ModalActions
          onCancel={() => setShowCategoryModal(false)}
          onSave={saveCategory}
        />
      </Modal>
    );
  }
};

/* -------------------- Reusable UI -------------------- */

const Modal = ({ title, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white p-6 rounded w-96 space-y-3">
      <h2 className="font-bold">{title}</h2>
      {children}
    </div>
  </div>
);

const ModalActions = ({ onCancel, onSave }) => (
  <div className="flex justify-end gap-2">
    <button
      onClick={onCancel}
      className="bg-gray-300 px-3 py-1 rounded"
    >
      Cancel
    </button>
    <button
      onClick={onSave}
      className="bg-blue-600 text-white px-3 py-1 rounded"
    >
      Save
    </button>
  </div>
);

export default ShowCategories;
