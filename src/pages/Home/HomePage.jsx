import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sendRequest from "../../adapters/sendRequest";
import { useBeerStore } from "../../store/BusinessStore";

import "./HomePage.scss";

const HomePage = () => {
  const beers = useBeerStore((state) => state.beers);
  const addBeers = useBeerStore((state) => state.addBeers);
  const arrayRecipeNeedDelete = useBeerStore(
    (state) => state.arrayRecipeNeedDelete
  );
  const whatNeedDelet = useBeerStore((state) => state.whatNeedDelet);
  const removed = useBeerStore((state) => state.removed);

  useEffect(() => {
    getBeersValueFromApi(currentPage);
  }, []);

  const getBeersValueFromApi = (number) => {
    sendRequest(`https://api.punkapi.com/v2/beers?page=${number}`).then(
      (respons) => {
        addBeers(respons);
        setDisplayDataFromApi(respons.slice(0, 15));
      }
    );
  };

  const [displayDataFromApi, setDisplayDataFromApi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const deleteRecipe = (array) => {
    const updatedData = beers.filter((element) => {
      return !array.includes(element.id);
    });

    addBeers(updatedData);
    setDisplayDataFromApi(updatedData.slice(0, 15));

    if (updatedData.length < 15) {
      setCurrentPage(currentPage + 1);
      getBeersValueFromApi(currentPage);
      removed();
    }
  };

  const rightClick = (event, id) => {
    event.preventDefault();
    whatNeedDelet(id);

    if (arrayRecipeNeedDelete.includes(id)) {
      const remove = arrayRecipeNeedDelete.filter((prevId) => prevId !== id);
      removed();
      remove.forEach((number) => whatNeedDelet(number));
    }
  };

  const renderComponent = displayDataFromApi.map((recipe) => {
    return (
      <Link
        to={`/selectedRecipe/${recipe.id}`}
        key={recipe.id}
        className="link"
      >
        <div
          className={
            arrayRecipeNeedDelete.includes(recipe.id) ? "card selected" : "card"
          }
          onContextMenu={(event) => rightClick(event, recipe.id)}
        >
          <img
            className="card__img"
            src={`${recipe.image_url}`}
            alt={`${recipe.name}`}
          />
          <div className="card__text">
            <h3 className="card__text-title">{`${recipe.name}`}</h3>
            <p className="card__text-paragraph">
              <span className="bold">Description:</span>{" "}
              {`${recipe.description}`}
            </p>
            <p className="card__text-paragraph">
              <span className="bold">First brewed:</span>{" "}
              {`${recipe.first_brewed}`}
            </p>
            <p className="card__text-paragraph">
              <span className="bold">Tagline:</span> {`${recipe.tagline}`}
            </p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <>
      {renderComponent}

      <button
        type="button"
        className={
          arrayRecipeNeedDelete.length ? "deleteButton" : "deleteButton hidden"
        }
        onClick={() => deleteRecipe(arrayRecipeNeedDelete)}
      >
        Delete
      </button>
    </>
  );
};

export default HomePage;
