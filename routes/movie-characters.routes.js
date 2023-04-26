const router = require("express").Router();

//require the api service
const ApiService = require("../services/api.service");
const apiService = new ApiService();

//List all characters from api
router.get("/movie-characters/list", async (req, res, next) => {
  try {
    const response = await apiService.getAllCharacters();
    const characters = response.data;

    res.render('pages/characters-list', {characters})
    console.log(characters);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//render a form to create a new character
router.get("/movie-characters/create", (req, res) => res.render('pages/new-character-form'));

//Submit info to create a character
router.post("/movie-characters/create", async (req, res, next) => {
  //   res.send(`send form to update with re.params.id`);
  try {
    const characterInfo = req.body;

    const response = await apiService.createCharacter(characterInfo);
    const newCharacter = response.data;
    console.log(newCharacter);

    //post then get sent back to list of characters
    res.redirect('/movie-characters/list')
  } catch (error) {
    next(error);
  }
});

//render edit form
router.get("/movie-characters/edit/:id", async (req, res, next) => {
try {
    const characterId = req.params.id;

    const response = await apiService.getOneCharacter(characterId);
    const oneCharacter = response.data;

    res.render('pages/edit-character-form', {oneCharacter});
} catch (error) {
    next(error);
}
});

//Update a character via id
router.post("/movie-characters/edit/:id", async (req, res, next) => {
  //   res.send("update character via req.params.id");
  try {
    const characterId = req.params.id;
    const characterInfo = req.body;

    const response = await apiService.editCharacter(characterId, characterInfo);
    const updatedCharacter = response.data;

    console.log(updatedCharacter);
    res.redirect('/movie-characters/list');
  } catch (error) {
    next(error);
    console.log(error);
  }
});

//delete a character via ID
router.get("/movie-characters/delete/:id", async (req, res, next) => {
  try {
    const characterId = req.params.id;

    const response = await apiService.deleteCharacter(characterId);
    const deleted = response.data;

    res.redirect('/movie-characters/list');
  } catch (error) {}
});

module.exports = router;
