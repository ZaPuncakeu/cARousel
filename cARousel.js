let carousels = [];

$(document).ready(function()
{
    $.fn.cARousel = function(speed = "fast")
    {
        let informations = {
            speed: speed,
            loading: false,
            n_elems: $(this).children().length,
            curr_elem: 0
        };

        carousels.push(informations);

        $cAR = $(this);
        let elements = $cAR.children();

        $cAR.append('<div class="carousel-content"></div>');
        $cAR.append('<div class="carousel-indicators"></div>');
        $cAR.append('<div class="carousel-arrows">'+
                        '<button onclick="prevElem(this,'+(carousels.length-1)+')" class="c-arrow-left fa fa-angle-left"></button>'+
                        '<button onclick="nextElem(this,'+(carousels.length-1)+')" class="c-arrow-right fa fa-angle-right"></button>'+
                        '</div>'
        );

        for(let i = 0; i < elements.length; i++)
        {
            $cAR.children(".carousel-content").append(elements[i]);
            $cAR.children(".carousel-indicators").append('<button onclick="goToElem(this,'+(carousels.length-1)+')" class="c-ind"></button>');
            if(i > 0)
            {
                $cAR.children(".carousel-content").find(".c-item").eq(i).hide();
            }
        }

        $cAR.children(".carousel-indicators").find(".c-ind").eq(0).addClass("c-ind-selected");
        
    }

    

        
        $(".c-arrow-left").on("click", function()
        {
            
        });

        $(".c-arrow-right").on("click", function()
        {
            if(!carousel_changing)
            {
                carousel_changing = true;
                let index = $(this).parent().parent().find(".c-ind-selected").index();
                let size = $(this).parent().parent().children(".carousel-content").children().length;
                $(this).parent().parent().find(".c-ind-selected").removeClass("c-ind-selected");
                $(this).parent().parent().children(".carousel-content").find(".c-item").eq(index).fadeOut(time, function()
                {
                    if(index >= size-1)
                    {
                        index = 0;
                    }
                    else 
                    {
                        index++;
                    }
                    $(this).parent().parent().children(".carousel-content").find(".c-item").eq(index).fadeIn(time);
                    $(this).parent().parent().children(".carousel-indicators").find(".c-ind").eq(index).addClass("c-ind-selected");
                    carousel_changing = false;
                });
            }
        });

        $(".c-ind").on("click", function()
        {
            
        });
});


function prevElem(elem,infos_index)
{
    if(!carousels[infos_index].loading)
    {
        carousels[infos_index].loading = true;
        let index = $(elem).parent().parent().find(".c-ind-selected").index();
        let size = carousels[infos_index].n_elems;
        $(elem).parent().parent().find(".c-ind-selected").removeClass("c-ind-selected");
        $(elem).parent().parent().children(".carousel-content").find(".c-item").eq(index).fadeOut(carousels[infos_index].speed, function()
        {
            if(index <= 0)
            {
                index = size-1;
            }
            else 
            {
                index--;
            }
            $(elem).parent().parent().children(".carousel-content").find(".c-item").eq(index).fadeIn(carousels[infos_index].speed);
            $(elem).parent().parent().children(".carousel-indicators").find(".c-ind").eq(index).addClass("c-ind-selected");
            carousels[infos_index].loading = false;
        });
    }
}

function nextElem(elem,infos_index)
{
    if(!carousels[infos_index].loading)
    {
        carousels[infos_index].loading = true;
        let index = $(elem).parent().parent().find(".c-ind-selected").index();
        let size = carousels[infos_index].n_elems;
        $(elem).parent().parent().find(".c-ind-selected").removeClass("c-ind-selected");
        $(elem).parent().parent().children(".carousel-content").find(".c-item").eq(index).fadeOut(carousels[infos_index].speed, function()
        {
            if(index >= size-1)
            {
                index = 0;
            }
            else 
            {
                index++;
            }
            $(elem).parent().parent().children(".carousel-content").find(".c-item").eq(index).fadeIn(carousels[infos_index].speed);
            $(elem).parent().parent().children(".carousel-indicators").find(".c-ind").eq(index).addClass("c-ind-selected");
            carousels[infos_index].loading = false;
        });
    }
}

function goToElem(elem, infos_index)
{

    let base_index = $(elem).parent().find(".c-ind-selected").index();    
    $(elem).parent().find(".c-ind-selected").removeClass("c-ind-selected");
    let index = $(elem).index();

    if(!carousels[infos_index].loading)
    {
        carousels[infos_index].loading = true;
        $(elem).parent().parent().children(".carousel-content").find(".c-item").eq(base_index).fadeOut(carousels[infos_index].speed, function()
        {
            $(elem).parent().parent().children(".carousel-content").find(".c-item").eq(index).fadeIn(carousels[infos_index].speed);
            $(elem).addClass("c-ind-selected");
            carousels[infos_index].loading = false;
        });
    }
}