import { useParams } from "react-router-dom";
import { useBeerStore } from "../../store/BusinessStore";
import "./SelectedRecipePage.scss";

const SelectedRecipePage = () => {
  const { id } = useParams();
  const beers = useBeerStore((state) => state.beers);

  const filteredItem = beers.find((recipe) => recipe.id === parseInt(id));
  console.log("filteredItem", filteredItem);

  const ingredient = filteredItem.ingredients.malt.map((product) => (
    <>
      <p>{product.name}</p>
      <p>
        {product.amount.value} {product.amount.unit}
      </p>
    </>
  ));

  return (
    <section className="recipe__page">
      <img
        src={`${filteredItem.image_url}`}
        alt={filteredItem.name}
        className="recipe__page-img"
      />
      <div className="recipe__page-description">
        <div className="">
          <h3 className="title">{filteredItem.name}</h3>
          <p className="tips">Brewers Tips: {filteredItem.brewers_tips}</p>
          <p>Description: {filteredItem.description}</p>
        </div>
        <div>
          <h4>Ingredients</h4>
          {ingredient}
        </div>
      </div>
    </section>
  );
};

export default SelectedRecipePage;
