## Public Fields
None

&nbsp;


## Public Methods

-----

`init()`

**Description**
- Sets up axis generators, scale functions, data - all together. 
- This is equivalent to calling all the below initialisation methods with default values.

**Parameters**
None

**Returns**
None

-----

`initStack()` 

**Description**

- Prepares raw data for rendering stacked bar graph.
- This function initialises a `d3.stack()` function and its return data.

**Parameters**

None, but note that this method relies on the values of #nSeries and #data. Please initialise these fields before calling this method.

**Returns**

None, though this method initialises the field #stackData.

-----

`initCScale()`

**Description**

- Sets up scale function for categorical data axis
- This is a `d3.bandScale()` by default. 
- Note that you can set another scale by directly accessing the #cScale field.

**Parameters**

None, but note that this method relies on values of #data, #cSeries,#margins, and #width. Please initialise these fields before calling this method.

**Returns**

None, though this method initialises the field #cScale.

-----

`initNScale(log = false)`

**Description**

- Sets up scale function for the numerical data axis.
- Note that you can set another scale by directly accessing the #nScale field.

**Parameters**

- `log (type: boolean, default: false)`. Whether to set the bar height with a log scale.
- Also, this method relies on values of #stackGen and #stackData. Please initialise these fields before calling this method.

**Returns**

None, though this method initialises the field #nScale.

-----

`initAxes(cAxisOptions = {}, nAxisOptions = {})`

**Description**

- Sets up axis generator functions.
- Note that you can set other axis generator functions by directly accessing the #axisGens field.

**Parameters**

- `cAxisOptions (type: object, default: {})`. Key value pairs of parameters that are valid for the `d3.axisLeft()` or `d3.axisBottom()` functions. These will be used to customise the categorical axis. See d3.js documentation for more details.
- `nAxisOptions (type: object, default: {})`. Key value pairs of parameters that are valid for the `d3.axisLeft()` or `d3.axisBottom()` functions. These will be used to customise the numerical axis. See d3.js documentation for more details.
- Also, this method relies on values of #cScale and #nScale. Please initialise these fields before calling this method.

**Returns**

None, though this method initialises the #axisGens field.

-----

`initBarWidth()`

**Description**

- Computes width of each bar in the bar graph based on data and graph size.
- Note that you can set another bar width by directly accessing the #barWidth field.

**Parameters**

None, but note this method relies on #margins, #width, #data, #grouped, and #padding. Please initialise these fields before calling this method.

**Returns**

None, though this method initialises the #barWidth field.

-----

`clear()`

**Description**

- Removes existing SVG elements from the graph.
- Note that this method does not clear any fields. It only removes visual elements.
- Please avoid putting children in the DOM elements set to the #wrapper and #container fields. All children in these DOM elements will be cleared. Ie. make an isolated bar graph wrapper and SVG container for this class to use alone.

**Parameters**

None, but note that this method relies on #wrapper and #container. Please initialise these fields before calling this method.

**Returns** 
None

-----

`render()`

**Description**

- Displays the graph after settings have been configured.
- Self-evidently, this method relies on all fields. Initialise all fields before calling this method.

**Parameters**
None

**Returns** 
None

------

`dataMinMax()`

**Description**

- Gets min and max values across numerical series of the datasets.
- This is useful when initialising the numerical scale function.
- Still, you will not normally need to call this function.

**Parameters**

None, but this method relies on #grouped, #stackData, and #nSeries. 
Please initialise these values before calling this method.

**Returns** 

Array 
- has two elements: the minimum and maximum numerical values.

------

&nbsp;

&nbsp;

## Private Fields
Graph 'Settings': 

`#container` (D3 selection):
- An SVG element to render the bar graph in. 
- Ensure you send a D3 selection of a DOM element, not a DOM element itself.
- Warning: **the value you set to this field is not validated. Any bugs due to incorrect values are your responsibility.**

`#wrapper` (D3 selection):
- A div element that contains the SVG element.
- This is separate from `#container` since it is needed to house tooltips. 
- Warning: **the value you set to this field is not validated. Any bugs due to incorrect values are your responsibility.**

`#width`/`#height` (numbers):
- Control the size of the bar graph.

`#margins` (array of numbers):
- The top, right, bottom, and left margins of the bar graph.

`#graphTitle`/`#cAxisTitle`/`#nAxisTitle` (strings):
- The titles to display on top of the graph and on the categorical and numerical axes.

`#data` (array of objects): 
- Each object corresponds to one datapoint with multiple key value pairs. 
- As the name suggests, that the values you intend to show on the numerical axis must be numbers. Ensure this is true before passing data to the class. 

`#cSeries`/`#nSeries`/`#tooltipSeries` (array of strings): 
- The key(s) of `#data`'s objects specifying data to be shown in the categorical/numerical axis or tooltips. 
- The categorical series must be an array of exactly one string (can't have multiple data fields shown on the categorical axis).
- The numerical series can be an array with one or more strings. Multiple strings mean multiple data fields will be shown as stacked bar graphs or grouped bar graphs. 
- The tooltip series can be an array with one or more strings. Multiple strings will cause multiple values to be shown when hovering over bars.

`#barLabels` (boolean, default true):
- Whether to have value labels shown next to bars. 

`#tooltips` (boolean, default true):
- Whether to display tooltips on hover. 

`#vertical` (boolean, default false):
- Whether to have vertical bars (compared to horizontal)

`#grouped` (boolean, default false):
- Whether to have side-by-side bars in groups if multiple keys are specified in `#nSeries`. (Compared to stacking the bars)

`#barWidth` (number):
- The width of each bar graphed. 

`#padding` (number):
- A number between 0 and 1, representing a decimal percentage. 
- This is the percentage of each bar's width that will be padded white space.

`#legendRadius` (number, default 12): 
- The radius of circles in the legend. 

&nbsp;

Customisable D3.js Functions:
Warning: **the values you set to these fields are not validated. Any bugs due to incorrect values are your responsibility.**

`#axisGens` (array):
- This array must have exactly two D3.js axis generator functions: one for the categorical axis and one for the numerical axis.
- It all automatically be set by `initAxes()` unless you manually change its value.

`#stackGen` (D3.js stack generator function):
- This stack generator function will be used to process the row data for stacked bar graphs.
- It all automatically be set by `initStack()` unless you manually change its value.

`#stackData` (array):
- This is the processed data used to generate stacked bar graphs.
- It will automatically be initialised to the return value of a D3.js stack generator function. Unless you are familiar with the specification of this function's return, it is highly recommended you do not change this value.

`#cScale` (D3.js scale function):
- This is used to position axis labels and bars along the categorical axis.
- It all automatically be set by `initCScale()` to a `d3.bandScale()` unless you manually change its value.

`#nScale` (D3.js scale function):
- This is used to position axis labels and bars along the numerical axis.
- It all automatically be set by `initNScale()` unless you manually change its value.


&nbsp;

&nbsp;

## Private Methods

These helper methods are used internally by public methods. This documentation is included in case you need to fix bugs in these private methods.

------

`#renderAxes()`

**Description**

- Displays axes for the bar graph.
- Internally called by `render()`.
- **May have bugs in the height of the axis.**

**Parameters**

None, but relies on nearly all fields.

**Returns** 
None

------

`#renderTitles()`

**Description**

- Displays axis and bar graph titles.
- Internally called by `render()`.
- **May have bugs in the height of the bar graph title.**

**Parameters**

None, but relies on nearly all fields.

**Returns** 
None

------

`#renderLegends()`

**Description**

- Displays legend labels.
- Internally called by `render()`.
- **The legend positioning often must be adjusted by different users.**
- Ie. you'll likely need to modify this method.

**Parameters**

None, but relies on nearly all fields.

**Returns** 
None

------

`#renderTooltips()`

**Description**

- Adds a tooltip box to the graph's wrapper and returns event handlers needed to control it.
- Internally called by `render()`.
- Bugs are not too likely, but mobile responsiveness will likely require adjustments.

**Parameters**

None, but relies on nearly all fields.

**Returns** 
Array
- Three functions that handle the following events:
onMouseEnter, onMouseLeave, and onMouseMove.
- These event handlers are added to the graph's bars in `#renderBars()`.

------

`#renderBars(tooltipEnter, tooltipLeave, tooltipMove)`

**Description**

- Displays bars for the bar graph.
- Internally called by `render()`.
- **May have bugs in the positioning of bar labels.**

**Parameters**

- `tooltipEnter (type: function)`: an event handler function for the tooltip behaviour the mouse enters a bar. This function is returned from `#renderTooltips()`.
- `tooltipLeave (type: function)`: an event handler function for the tooltip behaviour when the mouse leaves a bar. This function is returned from `#renderTooltips()`.
- `tooltipMove (type: function)`: an event handler function for the tooltip behaviour when the mouse moves inside a bar. This function is returned from `#renderTooltips()`.1
- Also, relies on nearly all fields. 

**Returns** 
None