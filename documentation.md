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

## Private Fields
Also, the following fields are useful to adjust: 
- data/cSeries/nSeries - raw data as an array of objects and the keys showing
  the categorical/numerical data field of objects
- graphTitle/cAxisTitle/nAxisTitle - the titles to display on top of the graph
  and on each axis
- vertical - whether to have vertical bars or horizontal
- grouped - whether to have side-by-side bars in groups or to stack the bars
- container - an SVG element to render the bar graph in
- wrapper - a div element containing the SVG element
- width/height/margins - controls the size of the bar graph