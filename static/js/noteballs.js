/**
 * Created by feiyiwang on 4/6/20.
 */
function loadNoteballs(data_source,svg_id) {
    var svg = d3.select(svg_id),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    // var color = d3.scaleOrdinal(d3.schemeCategory20);
    //蓝 橙 绿 粉 紫 草 黄
    var palette = [
        'rgb(50,120,160)','rgb(230,90,30)','rgb(50,150,80)','rgb(190,80,80)',
        'rgb(100,90,160)','rgb(130,160,20)','rgb(230,180,40)'
    ];
    function color(d) {
        function newColor(color,level) {
            return color+(255-color)*0.11*level
        }
        var group_color = palette[d.group-1], rgb=group_color.slice(4,-1).split(',').map(Number),
            r=newColor(rgb[0],d.level),g=newColor(rgb[1],d.level),b=newColor(rgb[2],d.level);
        return 'rgb('+String(r)+','+String(g)+','+String(b)+')'
    }
    function length(d) {
        return 100-Number(d.level)*5
    }
    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink()
            .id(function(d) { return d.id; })
        )
        .force("charge", d3.forceManyBody())
        //                .force("x", d3.forceX()) //press all small circles into a small ball
        //                .force("y", d3.forceY())
        .force("center", d3.forceCenter(width / 2, height / 2));

    d3.json(data_source, function(error, graph) {
        if (error) throw error;

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

        // var circle_link = node.append("a")
        //     .attr("href", function (d) {
        //         return "#a-" + d.id;
        //     });
        // var circles = circle_link.append("circle")
        var circles = node.append("circle")
            .attr("r", getRadius)
            .attr("fill", color)
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
            .style("fill", function (d) {
                if (d.level <= 4) {return "white"} else {return palette[d.group-1]}
            })
            .text(function(d) { return d.id; })
            .attr("text-anchor", "middle")
            .attr('x', 0) // how much from the text left side to the center of the circles horizontally
            .attr('y', function (d) {
                if (d.level <= 4) {return 4} else {return 2}
            }); // how much from the text top side to the center of the circles vertically

        function getRadius(d) {
            return 30-(d.level-1)*3.5
        }

         // Create Event Handlers for mouse
        function handleMouseOver(d) {  // Add interactivity

            // Use D3 to select element, change color and size
            d3.select(this)
                .style("stroke", "black")
                .attr("r", function (d) {
                    var r = getRadius(d);
                    return 1.2*r
                });

            // Specify where to put label of text
            d3.select(this.parentNode).append("text")
                .style('fill', function (d) {return palette[d.group-1]})
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
            .links(graph.links)
            .distance(function (d) {
                // alert(JSON.());
                return 90-10*d.source.level
            });

        function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node
                // .attr("cx", function(d) { return d.x; })
                // .attr("cy", function(d) { return d.y; });
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