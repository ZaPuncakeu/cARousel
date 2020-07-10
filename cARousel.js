$(document).ready(function()
{
    $.fn.carousel = function(time = "fast")
    {
        $(this).addClass("carousel");
        
        let elem_size = $(".carousel .c-item").length;
        let curr_elem = 1;
        let carousel_changing = false; 

        $(this).append('<div class="carousel-content"></div>');
        $(this).append('<div class="carousel-indicators"></div>');
        $(this).append('<div class="carousel-arrows">'+
                        '<button class="c-arrow-left fa fa-angle-left"></button>'+
                        '<button class="c-arrow-right fa fa-angle-right"></button>'+
                        '</div>'
        );

        for(let i = 1; i <= elem_size; i++)
        {
            $(".carousel > .c-item:nth-child(1)").clone().appendTo(".carousel-content");
            $(".carousel-indicators").append("<button class='c-ind'></button>")
            $(".carousel > .c-item:nth-child(1)").remove();
        }

        for(let i = 2; i <= elem_size; i++)
        {
            $(".event-carousel .c-item:nth-child("+i+")").hide();
        }

        $(".c-arrow-left").on("click", function()
        {
            if(!carousel_changing)
            {
                carousel_changing = true;
                $(".c-ind:nth-child("+curr_elem+")").removeClass("c-ind-selected");
                $(".c-item:nth-child("+curr_elem+")").fadeOut(time, function()
                {
                    if(curr_elem <= 1)
                    {
                        curr_elem = elem_size;
                    }
                    else 
                    {
                        curr_elem--;
                    }
                    $(".c-item:nth-child("+curr_elem+")").fadeIn(time);
                    $(".c-ind:nth-child("+curr_elem+")").addClass("c-ind-selected");
                    carousel_changing = false;
                });
            }
        });

        $(".c-arrow-right").on("click", function()
        {
            if(!carousel_changing)
            {
                carousel_changing = true;
                $(".c-ind:nth-child("+curr_elem+")").removeClass("c-ind-selected");
                $(".c-item:nth-child("+curr_elem+")").fadeOut(time, function()
                {
                    if(curr_elem >= elem_size)
                    {
                        curr_elem = 1;
                    }
                    else 
                    {
                        curr_elem++;
                    }
                    $(".c-item:nth-child("+curr_elem+")").fadeIn(time);
                    $(".c-ind:nth-child("+curr_elem+")").addClass("c-ind-selected");
                    carousel_changing = false;
                });
            }
        });

        $(".c-ind:nth-child("+curr_elem+")").addClass("c-ind-selected");

        $(".c-ind").on("click", function()
        {
            $(".c-ind:nth-child("+curr_elem+")").removeClass("c-ind-selected");
            let index = $(this).index();
            if(!carousel_changing)
            {
                carousel_changing = true;
                $(".c-item:nth-child("+curr_elem+")").fadeOut(time, function()
                {
                    curr_elem = parseInt(index+1);
                    $(".c-item:nth-child("+curr_elem+")").fadeIn(time);
                    $(".c-ind:nth-child("+curr_elem+")").addClass("c-ind-selected");
                    carousel_changing = false;
                });
            }
        });
    }

    $(".event-carousel").carousel();
});