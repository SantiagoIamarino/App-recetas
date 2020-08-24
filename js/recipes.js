let recipe;

let validatedScreens = [];

function recipeUnityChanged(event) {
    const unity = event.target.value;

    switch(unity){
        case 'kg':
            $('#cost_type').html('1 kg');
            break;
        case 'ml':
            $('#cost_type').html('1 L');
            break;
        case 'pz':
            $('#cost_type').html('Pieza');
            break;
        case 'cm':
            $('#cost_type').html('1 metro');
            break;
        default :
            $('#cost_type').html('unidad');
            break;
    }   
}

function showErrorMessage(message, screenId) {

    if(validatedScreens.indexOf(screenId) >= 0) {
        validatedScreens.splice(validatedScreens.indexOf(screenId), 1);
    }

    $('.bottom .alert-message').css({
        display: 'block'
    })

    $('#alert_message').html(message);
}

function createRecipe() {
    recipe = new Recipe(
        $('#recipeName').val(),
        $('#contactEmail').val(),
        [],
        0
    )
}

function validateIngredient() {
    if($('#ingredientName').val().length === 0) {
        showErrorMessage('Debes ingresar un nombre para el ingrediente', 2);
        return false;
    }

    if($('#ingredientUnity').val().length === 0) {
        showErrorMessage('Debes ingresar una unidad para el ingrediente', 2);
        return false;
    }

    if($('#ingredientQuantity').val().length === 0) {
        showErrorMessage('Debes ingresar una cantidad para el ingrediente', 2);
        return false;
    }

    if($('#ingredientPrice').val().length === 0) {
        showErrorMessage('Debes ingresar un costo para el ingrediente', 2);
        return false;
    }

    return true;
}

function validateScreen(screenId) {
    switch(screenId){
        case 1:
            if($('#recipeName').val().length > 0) {
                if($('#contactEmail').val().length > 0) {
                    if(validatedScreens.indexOf(screenId) < 0) {
                        validatedScreens.push(screenId);
                        $('.bottom .alert-message').css({
                            display: 'none'
                        })
                    }

                    createRecipe();
                } else {
                    showErrorMessage('Debes ingresar un email de contacto', screenId);
                }
            } else {
                showErrorMessage('Debes ingresar un nombre para la receta', screenId);
            }
            break;
        case 2:
            
            if(!validateIngredient()) {
                break;
            }

            if(recipe.ingredients.length <= 0) {
                showErrorMessage('Debes agregar al menos un ingrediente', 2);
                break;
            }

            if(validatedScreens.indexOf(screenId) < 0) {
                validatedScreens.push(screenId);
                $('.bottom .alert-message').css({
                    display: 'none'
                })
            }

            break;
        case 3:
            $('#cost_type').html('Pieza');
            break;
        case 4:
            $('#cost_type').html('1 metro');
            break;
    }   
}

function addIngredient() {
    if(!validateIngredient()) {
        return;
    }

    $('.bottom .alert-message').css({
        display: 'none'
    })

    const ingredient = new Ingredient(
        $('#ingredientName').val(),
        $('#ingredientUnity').val(),
        $('#ingredientQuantity').val(),
        $('#ingredientPrice').val()
    );

    recipe.ingredients.push(ingredient);

    const ingredientIndex = recipe.ingredients.length - 1;

    const listElement = 
    "<li class=\'list-group-item d-flex justify-content-between align-items-center\' id='ingredient_" + ingredientIndex +"'>" +
        (ingredientIndex + 1) + '- ' + ingredient.name + ' - ' + ingredient.quantity + ' - $' + ingredient.price +
        "<span onclick=\"removeIngredient('" + ingredientIndex +"')\"class=\'badge badge-primary badge-pill\' style='cursor: pointer;'>" +
            "<i class=\'fa fa-close\'></i>" +
        "</span>" +
    "</li>";

    $('.ingredients-list').css({
        display: 'block'
    });

    const oldHtml = $('#ingredients_list').html();
    $('#ingredients_list').html(oldHtml + listElement);
    

    adjustScreen(actualScreen);
}

function removeIngredient(ingredientId) {
    recipe.ingredients.splice(ingredientId, 1);

    $('#ingredient_' + ingredientId).remove();

    if(recipe.ingredients.length <= 0) {
        $('.ingredients-list').css({
            display: 'none'
        });
    }
}