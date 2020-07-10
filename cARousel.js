$(document).ready(function()
{
    $.fn.cARousel = function(time = "fast")
    {
        $(this).addClass("carousel");
        
        let elem_size = $(this).find(".c-item").length;
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
            $(this).children(".c-item").eq(i-1).clone().appendTo(".carousel-content");
            $(this).find(".carousel-indicators").append("<button class='c-ind'></button>")
             $(this).children(".c-item").eq(0).remove();
        }

        for(let i = 2; i <= elem_size; i++)
        {
            $(this).find(".c-item:nth-child("+i+")").hide();
        }

        $(".c-arrow-left").on("click", function()
        {
            if(!carousel_changing)
            {
                carousel_changing = true;
                $(this).find(".c-ind:nth-child("+curr_elem+")").removeClass("c-ind-selected");
                $(this).find(".c-item:nth-child("+curr_elem+")").fadeOut(time, function()
                {
                    if(curr_elem <= 1)
                    {
                        curr_elem = elem_size;
                    }
                    else 
                    {
                        curr_elem--;
                    }
                    $(this).find(".c-item:nth-child("+curr_elem+")").fadeIn(time);
                    $(this).find(".c-ind:nth-child("+curr_elem+")").addClass("c-ind-selected");
                    carousel_changing = false;
                });
            }
        });

        $(".c-arrow-right").on("click", function()
        {
            if(!carousel_changing)
            {
                carousel_changing = true;
                $(this).find(".c-ind:nth-child("+curr_elem+")").removeClass("c-ind-selected");
                $(this).find(".c-item:nth-child("+curr_elem+")").fadeOut(time, function()
                {
                    if(curr_elem >= elem_size)
                    {
                        curr_elem = 1;
                    }
                    else 
                    {
                        curr_elem++;
                    }
                    $(this).find(".c-item:nth-child("+curr_elem+")").fadeIn(time);
                    $(this).find(".c-ind:nth-child("+curr_elem+")").addClass("c-ind-selected");
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
                $(this).find(".c-item:nth-child("+curr_elem+")").fadeOut(time, function()
                {
                    curr_elem = parseInt(index+1);
                    $(this).find(".c-item:nth-child("+curr_elem+")").fadeIn(time);
                    $(this).find(".c-ind:nth-child("+curr_elem+")").addClass("c-ind-selected");
                    carousel_changing = false;
                });
            }
        });
    }
});
