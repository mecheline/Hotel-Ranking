import { useState, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import CategoryForm from "./CategoryForm";

interface Category {
  id: string;
  name: string;
}

interface RootState {
  categories: Category[];
}

const CategoryList: FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleDelete = (id: string): void => {
    dispatch({ type: "DELETE_CATEGORY", payload: id });
  };

  return (
    <div>
      <List>
        {categories.map((category) => (
          <ListItem key={category.id}>
            <ListItemText primary={category.name} />
            <Button onClick={() => setEditingCategory(category)}>Edit</Button>
            <Button onClick={() => handleDelete(category.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      {editingCategory && (
        <div className="mt-4">
          <h2>Edit Category</h2>
          <CategoryForm categoryToEdit={editingCategory} />
          <Button onClick={() => setEditingCategory(null)}>Cancel</Button>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
