import { useState } from "react";
import "./index.css";
import axios from "axios";
import { useAuth } from './Context/AuthContext';


const RecipeForm = () =>{
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        dish:"",
        description:"",
        ingredients:"",
        prepTime:"",
        recipe:"",
        imageUrl:""
    })

    
    

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const payload = {
            ...formData,
            userId: user.id,
        };

        
        try{
            const response = await axios.post("http://localhost:5000/recipes/user",payload, {
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${user?.token}`
                }
            })
            console.log("Success:", response.data);
            alert("Recipe posted!");
            } catch (error) {
                console.error("Error submitting recipe:", error);
                alert("Error submitting recipe.");
            }
        
        } ;

    return(
        <div>
            <div>
                <form className="recipe-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Dish</label>
                    <input type="string" name="dish" placeholder="Add the name of your dish here" onChange={handleChange}></input>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                    <input type="string" name="description" placeholder="Add the description" onChange={handleChange}></input>
                    </div>



                    
                <div className="form-group"><label>Ingredients</label>
                    <textarea className="recipe-form-input" type="string" name="ingredients" placeholder="Add your ingredients here" onChange={handleChange}/></div>
                    

                    <div className="form-group"><label>Recipe</label>
                    <textarea className="recipe-form-input" type="string" name="recipe" placeholder="Add the cooking instructions here" onChange={handleChange}/>
                    </div>

                    <div>
                        <label>Prep time</label>
                        <input className="recipe-form-input" type="string" name="prepime" placeholder="Add the prep time here" onChange={handleChange}></input>
                    </div>

                    <div className="form-group">
                            <label>Image URL</label>
                                <input
                                    type="text"
                                    name="imageUrl"
                                     placeholder="Paste your image URL here"
                                    onChange={handleChange}
                                />
                    </div>

                    <button type="submit">Post</button>

                    

                </form>
            </div>

        </div>
    );
};

export default RecipeForm;