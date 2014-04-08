$(document).ready(function() {
    (function($) {
        jQuery.fn.extend({
            pj_LighboxGallery: function(options) {
                var defaults = {
                    gridClass: '#LightboxGallery .Grid',
                    gridImageClass: '#LightboxGallery .Grid a',
                    gridImageResolution: '100',
                    lightboxClass: '#LightboxGallery .Lightbox',
                    lightboxCloseClass: '#LightboxGallery .Lightbox .Close',
                    bigImageClass: '#LightboxGallery .Lightbox .Box img',
                    bigImageSrc: 'images/big/',
                    galleryClass: '#LightboxGallery .Lightbox .Gallery',
                    nextSlide: '#LightboxGallery .Lightbox .Box .Next',
                    prevSlide: '#LightboxGallery .Lightbox .Box .Prev',
                    sliderTab: 3
                };
                var options = $.extend(true, {}, defaults, options);

                var getBigImage;
                var countGridList = $(options.gridImageClass).size();
                var sliderWidth = options.gridImageResolution * countGridList;


                /*Lighbox Movable Slider*/
                function MoveSlider() {
                    var checkLastSlide = countGridList - options.sliderTab + 1;                    
                    if (getBigImage <= checkLastSlide) {
                        if (getBigImage >= options.sliderTab) {
                            var nextSlideNumber = (getBigImage - options.sliderTab) * options.gridImageResolution;
                            $(options.galleryClass + " div").css('margin-left', -Math.abs(nextSlideNumber));
                        }
                    }
                }
                /*End Lighbox Movable Slider*/

                /*Slider Width & Height*/
                function SliderResolution() {
                    $(options.galleryClass + " div").css({
                        width: sliderWidth + 'px',
                        height: options.gridImageResolution + 'px'
                    });
                }
                /*End Slider Width & Height*/

                /*Next Slide*/
                function NextSlide() {
                    $(options.nextSlide).click(function() {
                        if (getBigImage == countGridList) {
                            return;
                        }
                        getBigImage = parseInt(getBigImage) + 1;
                        ShowBigImage();
                    });
                }
                NextSlide();
                /*End Next Slide*/

                /*Previous Slide*/
                function PrevSlide() {
                    $(options.prevSlide).click(function() {
                        if (getBigImage == 1) {
                            return;
                        }
                        getBigImage = parseInt(getBigImage) - 1;
                        ShowBigImage();
                    });
                }
                PrevSlide();
                /*End Previous Slide*/


                /*Show Big Image*/
                function ShowBigImage() {
                    MoveSlider();
                    $(options.gridImageClass).removeAttr('class');
                    $(options.gridImageClass + ":nth-child(" + getBigImage + ")").addClass('active');
                    $(options.bigImageClass).attr('src', options.bigImageSrc + getBigImage + '.jpg');
                    if (getBigImage == 1) {
                        $(options.prevSlide).addClass('disable');
                        return;
                    }
                    else if (getBigImage == countGridList) {
                        $(options.nextSlide).addClass('disable');
                        return;
                    }
                    else {
                        $(options.prevSlide).removeClass('disable');
                        $(options.nextSlide).removeClass('disable');
                    }
                }
                /*End Show Big Image*/

                /*Show Lightbox On Click*/
                function ShowLightbox() {
                    $(options.gridImageClass).click(function() {
                        getBigImage = parseInt($(this).attr('title'));
                        var checkClick = $(this).attr('value');

                        if (checkClick == 'checkClick') {
                            ShowBigImage();
                            return;
                        }

                        ShowBigImage();

                        $(options.lightboxClass).show('slow');
                        $(options.galleryClass + ' div').remove();
                        $(options.gridClass).clone(true).prependTo(options.galleryClass);
                        $(options.galleryClass + " div a").attr('value', 'checkClick');
                        SliderResolution();
                        MoveSlider();
                    });
                }
                ShowLightbox();
                /*End Show Lightbox On Click*/

                /*Hide Lightbox On Click*/
                function HideLightbox() {
                    $(options.lightboxCloseClass).click(function() {
                        $(options.lightboxClass).hide('slow');
                        $(options.gridImageClass).removeClass('active');
                    });
                }
                HideLightbox();
                /*End Hide Lightbox On Click*/

            }
        });
    })(jQuery);
});