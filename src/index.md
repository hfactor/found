---
layout: layout.njk
title: made_
description: Collection of my design work since 2007, presented without commentary.

---
<header>
    <h1 class="title">{{ title }}</h1>
    <div class="description">
    I never kept a portfolio. This is where some of them ended up. No context, no case studies. Just pieces of work, scattered over time. I’ll keep adding more. If you’ve got something I missed, <a href="mailto:hiran.v@gmail.com">send it over.</a>. 
    </div>
</header>

<main>
    <div class="items grid" role="list">
    {%- for image in collections.allImages -%}
        {%- assign remainder = forloop.index | modulo: 5 -%}
        <article class="item{% if remainder == 0 %} wide{% endif %}{% if forloop.index > 10 %} hidden{% endif %}" role="listitem" data-index="{{ forloop.index }}">
            <div class="item-link">
                <img 
                    src="{{ image.thumbnail }}" 
                    alt="Thumbnail of {{ image.name }}"
                    width="256"
                    height="256"
                    loading="lazy"
                    decoding="async">
                <div class="item-info">
                    <span class="item-title">{{ image.name | replace: "-", " " | replace: "_", " " | replace: ".jpg", "" | replace: ".png", "" | upcase }}</span>
                    <span class="item-folder">{{ image.folder | upcase }}</span>
                </div>
            </div>
        </article>
    {%- endfor -%}
    </div>
    {%- if collections.allImages.size > 10 -%}
    <div class="load-more">
        <button id="loadMore" class="load-more-button">Load More</button>
    </div>
    {%- endif -%}
</main>

<footer>
    <div class="footer-content">
        <div class="footer-text">Design Sans Dialogue</div>
        <div class="footer-text"><a href="https://www.11ty.dev/">11ty</a> + <a href="https://fonts.google.com/specimen/Space+Grotesk">Space Grotesk</a> </div>
        <div class="footer-text"><a href="https://github.com/hfactor/found/">Source Code</a></div>
    </div>
</footer>

<script>
    let currentPage = 1;
    const itemsPerPage = 10;
    const totalItems = {{ collections.allImages.size }};
    
    document.getElementById('loadMore').onclick = function() {
        currentPage++;
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        document.querySelectorAll('.item.hidden').forEach(item => {
            const index = parseInt(item.dataset.index);
            if (index > start && index <= end) {
                item.classList.remove('hidden');
                item.classList.add('loaded');
            }
        });
        
        // Hide button if we've shown all items
        if (end >= totalItems) {
            this.style.display = 'none';
        }
    };
</script>