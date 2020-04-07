/**
 * Created by feiyiwang on 4/6/20.
 */
function loadNoteballs(data_source) {
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink()
            .id(function(d) { return d.id; })
            .distance(100)
//                        .distance(function (link) {
//                            return link.graph === 0 ? height/2 : height/4;
//                        })
        )
        .force("charge", d3.forceManyBody())
        //                .force("x", d3.forceX()) //press all small circles into a small ball
        //                .force("y", d3.forceY())
        .force("center", d3.forceCenter(width / 2, height / 2));

    d3.json(data_source, function(error, graph) {
        if (error) throw error;

        var palette = {
            'level1':['#3182bd','#e6550d','#31a354','#d6616b','#756bb1','#94AB18','#F1B82B'],
            'level2':['#6baed6','#fd8d3c','#74c476','#DD8C8F','#9e9ac8','#AAC421','#F9BA52'],
            'level3':['#9ecae1','#fdae6b','#a1d99b','#F3B1AC','#bcbddc','#CAD856','#F9C671'],
            'level4':['#c6dbef','#fdd0a2','#c7e9c0','#f1c3bd','#dadaeb','#DCE57C','#FAD296']
        };

        function color(d) {
            return palette["level"+d.level][d.group-1]
        }

        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(graph.nodes)
            .enter().append("g");

        var circle_link = node.append("a")
            .attr("href", function (d) {
                return "#a-" + d.id;
            });

        var circles = circle_link.append("circle")
            .attr("r", getRadius)
            .attr("fill", color)
            //                    .on("click", handleClick)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));


        var lables = node.append("text")
            .style("font-size", function (d) {
                r = getRadius(d);
                return r/2
            })
            .style("fill", "white")
            .text(function(d) { return d.id; })
            .attr("text-anchor", "middle")
            .attr('x', 0) // how much from the text left side to the center of the circles horizontally
            .attr('y', 4); // how much from the text top side to the center of the circles vertically

        function getRadius(d) {
            if (d.level == 1) {
                return 30
            } else if (d.level == 2) {
                return 25
            } else {
                return 20
            }
        }

//            function handleClick(d) {
//
//            }

//          // Create Event Handlers for mouse
        function handleMouseOver(d) {  // Add interactivity

            // Use D3 to select element, change color and size
            d3.select(this)
                .style("stroke", "black")
                .attr("r", function (d) {
                    var r = getRadius(d);
                    return 1.2*r
                });
//                        .attr()


//                div	.html(
//                        '<a id="a-' + d.id + '"' + ' href= "#'+ d.id +'">' + // The first <a> tag
//                        d.name +
//                        "</a>")                        // closing </a> tag
//                //                                "+<br/>"  + d.close)


            // Specify where to put label of text
            d3.select(this.parentNode).append("text")
                .style('fill', "#336ca9")
                .style("font-size", "20px")
                .attr("id", "t-" + d.id)  // Create an id for text so we can select it later for removing on mouseout
                .attr("x", function (d) {
                    var r = getRadius(d);
                    return 2*r
                })
                .attr("y", 5)
                .text(function() {
                    return d.name;  // Value of the text
                });
        }

        function handleMouseOut(d) {
            // Use D3 to select element, change color back to normal
            d3.select(this).attr("r", getRadius).style("stroke", "white");

            // Select text by id and then remove
            d3.select("#t-" + d.id)
            //                        .transition()
            //                        .delay(200)
                .remove();  // Remove text location
        }


        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);

        function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                })
        }
    });

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}