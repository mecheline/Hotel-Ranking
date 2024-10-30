import { useState, useEffect, FC } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";

interface Category {
  id: string;
  name: string;
}

interface CategoryFormProps {
  categoryToEdit?: Category | null;
}

const CategoryForm: FC<CategoryFormProps> = ({ categoryToEdit = null }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<Category>({ id: "", name: "" });

  useEffect(() => {
    if (categoryToEdit) {
      setCategory(categoryToEdit);
    }
  }, [categoryToEdit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (category.id) {
      dispatch({ type: "UPDATE_CATEGORY", payload: category });
    } else {
      dispatch({
        type: "ADD_CATEGORY",
        payload: { ...category, id: Date.now().toString() },
      });
    }
    setCategory({ id: "", name: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        sx={{ marginBottom: 2 }}
        size="small"
        fullWidth
        label="Category Name"
        value={category.name}
        onChange={(e) => setCategory({ ...category, name: e.target.value })}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {category.id ? "Update Category" : "Add Category"}
      </Button>
    </form>
  );
};

export default CategoryForm;
