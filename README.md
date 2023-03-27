# D3 Bar Chart

This is a **reusable class-based component for D3.js version 7.** It was produced for the Public Health Infobase team at the Public Health Agency of Canada. 

Using this class mainly involves sending in data and styling the graph with CSS. Still, a few bugs may exist (especially with legends and bar labels). **Please test this code before publishing in a production environment.**

## Examples
![Example using horizontal and grouped bars with value labels](/img/rotatedGroupedBarGraph.png)
![Example using vertical and stacked bars without value labels](/img/stackedGraph.png)

## Quick Start
First, create an `index.html` file and `main.js` file in some directory. 
- For the HTML file, ensure you have a div whose only child is an SVG element.
- Also **ensure that you load the `d3.v7.js` library and `main.js` as a module** (in that order).

Here's an example:

```
(index.html)
--------------------
<!DOCTYPE html>
<html>

<head>
  <link rel="stylesheet" href="./main.css">
</head>

<body>
  <div class='svg-wrapper'>
    <svg class='bar'></svg>
  </div>
</body>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src='./main.js' type='module'></script>

</html>
```

Next, download the `bar.js` file in the `/dist` folder of this repository. 
Add it to the same directory as `index.html` and `main.js`. 

Also, add a CSV data file to that directory. Here is an example file:
```
(data.csv)
--------------------
day,apricots,blueberries,cherries
Monday,120,200,155
Tuesday,90,220,150
Wednesday,110,190,185
Thursday,120,175,145
Friday,105,205,180 
```

Next, put the following code in `main.js` to initialise the graph.

```
(main.js)
---------------------
import { BarGraph } from "./bar.js";

// Init
const Bar = new BarGraph();
Bar.wrapper = d3.select('div.svg-wrapper');
Bar.container = d3.select('svg.bar');

// Set SVG/graph size (px)
Bar.container.attr('height', 480);
Bar.container.attr('width', 720);
Bar.height = 480;
Bar.width = 720;

// Top, right, bottom, left margins
Bar.margins = [80, 40, 120, 100];

// Set titles
Bar.graphTitle = 'Harvest Counts by Day';
Bar.yAxisTitle = 'Count';
Bar.xAxisTitle = 'Day';
```

Now, append some more code to `main.js` to load the data you want and display the bar graph.
Note: the **ySeries variables must be numbers**.
You'll probably process your data with a callback function as an argument to `d3.csv()` to achieve this.

```
(main.js)
---------------------
// Load data
d3.csv('./YOURDATAHERE.csv', yourNumberConvertFunc)
  .then(d => {
    // Select x and y-axis data
    Bar.data = d;
    Bar.xSeries = 'day';
    // Multiple series for stacked graph
    Bar.ySeries = ['apricots', 'blueberries', 'cherries'];
    
    // Initiliase scales, axes, generators, etc.
    Bar.init();
    
    // Generate Bars
    Bar.render();
  });
```

You should now see a bar graph without styling when you launch `index.html`.
![Bar graph with no styling](/img/noStyles.png)

Note that **the styling is left to you**. 
The following CSS selectors might be useful:
- *Bars*: `svg.bar>g.bars` contains a subgroup for each series of data
  you have. For instance, it may contain `g.apricots` and `g.blueberries`
  (if you set those values in your ySeries array). Each of these subgroups will have `rect` elements you can style. 
- *Titles*: `svg.bar>g.titles` contains three text elements 
  which represent the graph title (`text.graph-title`), 
  y-axis title (`text.y-axis-title`), and x-axis title 
  (`text.x-axis-title`).
- *Axes*: `svg.bar>g.axes>g.y text` selects all the text in the 
  y-axis. Similarly, `svg.bar>g.axes>g.x text` selects 
  all the text in the x-axis.
- *Legend*: `svg.bar>g.legend` contains a `circle` and `text` element
  per output series that you have. Each will have a class based on 
  the values you set in your ySeries array. Ex: You might have 
  elements like `text.apricots` and `circle.apricots`.
- *Tooltip*: `div.svg-wrapper>div.tooltip` is the tooltip element. You
  will likely want to change its size, background colour, etc. 

For example, create a `main.css` file in your main directory and add the following CSS:
```
(main.css)
--------------------
/* Graph background */
svg {
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Legend and bar colours */
svg.bar > g.bars > g.detections > rect, svg.bar > g.legend circle.detections {
  fill: #3455DB;
}

svg.bar > g.bars > g.exceedances > rect, svg.bar > g.legend circle.exceedances {
  fill: #b11030;
}

/* Text sizing */
svg.bar text.graph-title {
  font-size: larger;
}
svg.bar g.axes text {
  font-size: small;
}

svg.bar text.x-axis-title, text.y-axis-title {
  font-size: large;
}

svg.bar g.legend text {
  font-size: small;
  text-transform: capitalize;
}

/* Tooltip styling */
div.tooltip {
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  position: fixed;
  max-width: 200px;
}
```

**Note how some CSS selectors will have their classes
change based on the series names you input.**

## Documentation
For more detailed documentation of this class's methods and fields, see `documentation.md` in this repository.