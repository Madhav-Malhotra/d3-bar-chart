/*

BAR.JS

This file has a class with methods related to creating a bar graph. 

Note that d3.js must be loaded before using this file.

The following methods can be used:
- BarGraph() - bar graph constructor 
- init() - sets up axis generators, scale functions, data - all together. 
- initStack() - prepares raw data for rendering stack bar graph.
- initCScale() - sets up scale function for categorical data axis
- initNScale() - sets up scale function for numerical data axis
- initAxes() - sets up axis generator functions
- initBarWidth() - computes width of each bar based on data and graph size
- clear() - removes the existing graph (visuals removed, settings remain)
- render() - displays the graph after settings have been configured

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

*/


export class BarGraph {
    // =============== DECLARE FIELDS ===================
    #data;
    #cSeries;
    #nSeries;
    #tooltipSeries;
    
    #graphTitle;
    #cAxisTitle;
    #nAxisTitle;
    
    #vertical = false;
    #grouped = false;
    #tooltips = true;
    #barLabels = true;
    
    #container;
    #wrapper;
    
    #axisGens;
    #stackGen;
    #stackData;
    
    #cScale;
    #nScale;
    
    #width = 720;
    #height = 480;
    #margins = {l: 60, r: 60, t: 40, b: 40};
    #padding = 0.25;
    
    #barWidth;
    #legendRadius = 12;
  
    // =============== GETTER METHODS ===================
    get data() {
      return this.#data;
    }
    get cSeries() {
      return this.#cSeries;
    }
    get nSeries() {
      return this.#nSeries;
    }
    get tooltipSeries() {
      return this.#tooltipSeries;
    }
    
    get graphTitle() {
      return this.#graphTitle;
    }
    get cAxisTitle() {
      return this.#cAxisTitle;
    }
    get nAxisTitle() {
      return this.#nAxisTitle;
    }
    
    get vertical() {
      return this.#vertical;
    }
    get grouped() {
      return this.#grouped;
    }
    get tooltips() {
      return this.#tooltips;
    }
    get barLabels() {
      return this.#barLabels;
    }
    
    get container() {
      return this.#container;
    }
    get wrapper() {
      return this.#wrapper;
    }
    
    get axisGens() {
      return this.#axisGens;
    }
    get stackGen() {
      return this.#stackGen;
    }
    get stackData() {
      return this.#stackData;
    }
    
    get cScale() {
      return this.#cScale;
    }
    get nScale() {
      return this.#nScale;
    }
    
    get width() {
      return this.#width;
    }
    get height() {
      return this.#height;
    }
    get margins() {
      return this.#margins;
    }
    get padding() {
      return this.#padding;
    }
    
    get legendRadius() {
      return this.#legendRadius;
    }
    get barWidth() {
      return this.#barWidth;
    }
  
    
    // =============== SETTER METHODS ===================
    set data(inputData) {
      /*
      Parameters 
      ----------------
      inputData (type: array)
        - An array of object(s) with 2+ fields per object
        - Each object represents one row of data. Each field represents a column
      */
      
      
      // Check input
      const nonEmptyArray = (typeof inputData == typeof []) 
        && (inputData.length > 0);
      let validElements = true;
      
      if (nonEmptyArray) {
        for (let v of inputData) {
          if ((typeof v != typeof {}) 
            || Object.keys(v).length < 2) {
            
              validElements = false;
              break;
          }
        }
      }
      
      // Set field
      if(nonEmptyArray && validElements) {
        this.#data = inputData;
      } else {
        console.error('Data must be an array of object(s) with 2+ fields');
      }
    }
    set cSeries(inputKey) {
      /*
      Parameters 
      ----------------
      inputKey (type: string)
        - A string representing a key that the data field has. 
        - This string should indicate some key to use for the categoricl axis
      */
      
      
      const validString = (typeof inputKey == typeof 'abc') && inputKey;
      
      if(validString) {
        this.#cSeries = inputKey;
      } else {
        console.error('cSeries must be a non-empty string');
      }
    }
    set nSeries(inputKeys) {
      /*
      Parameters 
      ----------------
      inputKeys (type: array)
        - An array of string(s) representing key(s) that the data field has. 
        - This array should indicate some key(s) to use for the numerical axis
      */
      
      
      // Check input
      const nonEmptyArray = (typeof inputKeys == typeof []) 
        && (inputKeys.length > 0);
      let validElements = true;
      
      if (nonEmptyArray) {
        for (let v of inputKeys) {
          if ((typeof v != typeof 'abc') || !v) {
            validElements = false;
            break;
          }
        }
      }
      
      // Set field
      if(nonEmptyArray && validElements) {
        this.#nSeries = inputKeys;
      } else {
        console.error('nSeries must be an array of non-empty string(s)');
      }
    }
    set tooltipSeries(inputKeys) {
      /*
      Parameters 
      ----------------
      inputKeys (type: array)
        - An array of string(s) representing key(s) that the data field has. 
        - This array should indicate some key(s) to use for the tooltips
      */
      
      
      // Check input
      const nonEmptyArray = (typeof inputKeys == typeof []) 
        && (inputKeys.length > 0);
      let validElements = true;
      
      if (nonEmptyArray) {
        for (let v of inputKeys) {
          if ((typeof v != typeof 'abc') || !v) {
            validElements = false;
            break;
          }
        }
      }
      
      // Set field
      if(nonEmptyArray && validElements) {
        this.#tooltipSeries = inputKeys;
      } else {
        console.error('tooltipSeries must be an array of non-empty string(s)');
      }
    }
    
    set graphTitle(inputTitle) {
      /*
      Parameters 
      ----------------
      inputTitle (type: string)
        - A string containing the title for the graph. 
      */
      
      
      const validString = (typeof inputTitle == typeof 'abc') && inputTitle;
      
      if(validString) {
        this.#graphTitle = inputTitle;
      } else {
        console.error('graphTitle must be a non-empty string');
      }
    }
    set cAxisTitle(inputTitle) {
      /*
      Parameters 
      ----------------
      inputTitle (type: string)
        - A string containing the title for the categorical axis. 
      */
      
      
      const validString = (typeof inputTitle == typeof 'abc') && inputTitle;
      
      if(validString) {
        this.#cAxisTitle = inputTitle;
      } else {
        console.error('cAxisTitle must be a non-empty string');
      }
    }
    set nAxisTitle(inputTitle) {
      /*
      Parameters 
      ----------------
      inputTitle (type: string)
        - A string containing the title for the numerical axis. 
      */
      
      
      const validString = (typeof inputTitle == typeof 'abc') && inputTitle;
      
      if(validString) {
        this.#nAxisTitle = inputTitle;
      } else {
        console.error('nAxisTitle must be a non-empty string');
      }
    }
    
    set vertical(inputToggle) {
      /*
      Parameters 
      ----------------
      inputToggle (type: bool)
        - True to make the graph have vertical bars. False otherwise.
      */
      
      const validBool = (typeof inputToggle == typeof true);
      
      if(validBool) {
        this.#vertical = inputToggle;
      } else {
        console.error('vertical must be a boolean');
      }
    }
    set grouped(inputToggle) {
      /*
      Parameters 
      ----------------
      inputToggle (type: bool)
        - True to make the graph have grouped bars. False otherwise.
      */
      
      const validBool = (typeof inputToggle == typeof true);
      
      if(validBool) {
        this.#grouped = inputToggle;
      } else {
        console.error('grouped must be a boolean');
      }
    }
    set tooltips(inputToggle) {
      /*
      Parameters 
      ----------------
      inputToggle (type: bool)
        - True to make the graph have tooltips. False otherwise.
      */
      
      const validBool = (typeof inputToggle == typeof true);
      
      if(validBool) {
        this.#tooltips = inputToggle;
      } else {
        console.error('tooltips must be a boolean');
      }
    }
    set barLabels(inputToggle) {
      /*
      Parameters 
      ----------------
      inputToggle (type: bool)
        - True to make the graph have barLabels. False otherwise.
      */
      
      const validBool = (typeof inputToggle == typeof true);
      
      if(validBool) {
        this.#barLabels = inputToggle;
      } else {
        console.error('barLabels must be a boolean');
      }
    }
    
    set legendRadius(inputRadius) {
      /*
      Parameters 
      ----------------
      inputRadius (type: number)
        - A non-negative number for the radius of the legend circles.
      */
      
      const validNum = (typeof inputRadius == typeof 5) 
        && (inputRadius >= 0);
      
      if(validNum) {
        this.#legendRadius = inputRadius;
      } else {
        console.error('radius must be a non-negative number');
      }
    }
    set barWidth(inputBarWidth) {
      /*
      Parameters 
      ----------------
      inputBarWidth (type: number)
        - A non-negative number for the width of bars.
      */
      
      const validNum = (typeof inputBarWidth == typeof 5) 
        && (inputBarWidth >= 0);
      
      if(validNum) {
        this.#barWidth = inputBarWidth;
      } else {
        console.error('barWidth must be a non-negative number');
      }
    }
    
    set width(inputWidth) {
      /*
      Parameters 
      ----------------
      inputWidth (type: number)
        - A non-negative number for the width of the bar graph.
      */
      
      const validNum = (typeof inputWidth == typeof 5) 
        && (inputWidth >= 0);
      
      if(validNum) {
        this.#width = inputWidth;
      } else {
        console.error('width must be a non-negative number');
      }
    }
    set height(inputHeight) {
      /*
      Parameters 
      ----------------
      inputHeight (type: number)
        - A non-negative number for the height of the bar graph. 
      */
      
      
      const validNum = (typeof inputHeight == typeof 5) 
        && (inputHeight >= 0);
      
      if(validNum) {
        this.#height = inputHeight;
      } else {
        console.error('height must be a non-negative number');
      }
    }
    set margins(inputMargins) {
      /*
      Parameters 
      ----------------
      inputMargins (type: array)
        - An array of numbers representing margins between the 
          bar graph and the SVG container. 
        - Specify margins in clockwise order (top, right, bottom, left)
      */
      
      // Validate nums
      let validNums = true;
      for (let n of inputMargins) {
        if (typeof n != typeof 5) {
          validNums = false;
          break;
        }
      }
      
      // Set fields
      if (validNums) {
        this.#margins = {
          l: inputMargins[3], 
          r: inputMargins[1], 
          t: inputMargins[0], 
          b: inputMargins[2]
        };
      } else {
        console.error(
          'Please input an array of four numbers to configure top,' + 
          'right, bottom, and left margins in that order.'
        );
      }
    }
    set padding(inputPadding) {
      /*
      Parameters 
      ----------------
      inputPadding (type: number)
        - A number between 0 and 1 that represents a decimal percentage. 
        - This should indicate what percent of a bar's width should 
          be cut away for padding.
      */
      
      const validNum = (typeof inputPadding == typeof 5) &&
        (inputPadding <= 1) && (inputPadding >= 0);
      
      if(validNum) {
        this.#padding = inputPadding;
      } else {
        console.error('padding must be a decimal percentage between 0-1');
      }
    }
    
    // NO VALIDATION setter methods (read: bugs are your responsibility)
    set axisGens(inputAxes) {
      /*
      Parameters 
      ----------------
      inputAxes (type: array)
        - An array with two d3.axis generator functions.
        - The first is the categorical axis. The second as the numerical axis
      */
      
      this.#axisGens = {c: inputAxes[0], n: inputAxes[1]};
    }
    set stackGen(inputStackGen) {
      /*
      Parameters 
      ----------------
      inputStackGen (type: function)
        - An d3.stack generator function.
      */
      
      this.#stackGen = inputStackGen;
    }
    set stackData(inputStackData) {
      /*
      Parameters 
      ----------------
      inputStackData (type: array)
        - The return array of objects from calling a d3.stack 
          generator function.
      */
      
      this.#stackData = inputStackData;
    }
    
    set cScale(inputCScale) {
      /*
      Parameters 
      ----------------
      inputCScale (type: function)
        - A d3.scale function that will be used to space the labels and 
          categorical position of bars.
      */
      
      this.#cScale = inputCScale;
    }
    set nScale(inputNScale) {
      /*
      Parameters 
      ----------------
      inputNScale (type: function)
        - A d3.scale function that will be used to set the height of the bars
      */
      
      this.#nScale = inputNScale;
    }
    
    set container(inputContainer) {
      /*
      Parameters 
      ----------------
      inputContainer (type: D3.js selection)
        - A SVG DOM element to render the bar graph in 
          (inputted as a d3.js selection)
      */
      
      this.#container = inputContainer;
    }
    set wrapper(inputWrapper) {
      /*
      Parameters 
      ----------------
      inputWrapper (type: D3.js selection)
        - A div containing the container element to render the 
          tooltips in (inputted as a d3.js selection)
      */
      
      this.#wrapper = inputWrapper;
    }
    
  
    // =============== HELPER METHODS (PUBLIC) ===================
    initStack() {
      /* 
      This function initialises a d3.stack() function and its return data. 
      
      Parameters
      ----------------
      undefined
      - Though note that the scales will be initialised using
        the values of #nSeries and #data.
  
      Returns
      ----------------
      undefined
      
      */
      
      // Create stack first (data needed for yScale)
      this.#stackGen = d3
        .stack()
        .keys(this.#nSeries);
      this.#stackData = this.#stackGen(this.#data);
    }
    initNScale(log = false) {
      /*
        This function initialises a d3.scale function to set bar height.
        
        NOTE: Ensure that this.#stackGen and this.#stackData are set
        before calling this method.
      
        Parameters 
        -----------------
        log (type: bool)
          - Whether to set the bar height with a log scale.
      */
      
      let [min, max] = this.dataMinMax();
  
      // Create log/lin functions
      if (log) {
        this.#nScale = d3
          .scaleLog()
          .domain([ min>0.001?min:0.001 , max])
          .range([0, this.#height - this.#margins.b - this.#margins.t]);
      } else {
        this.#nScale = d3
          .scaleLinear()
          .domain([0, max])
          .range([(this.#height - this.#margins.b), this.#margins.t]);
      }
      
      // Adjust for horizontal bar graphs
      if (!this.#vertical) {
        if (log) {
          this.#nScale = this.#nScale
            .range([this.#margins.l, this.#width-this.#margins.l-this.#margins.r]);
        } else {
          this.#nScale = this.#nScale
            .range([this.#margins.l, this.#width-this.#margins.l-this.#margins.r]);
        }
      }
      
    }
    initCScale() {
      /* 
      Initialises a bandscale for the categorical axis
      
      Parameters
      -------------------
      undefined
      - Though note that this method relies on values of #data, #cSeries, 
        #margins, and #width. Please initialise those before calling the method
        
      Returns
      -------------------
      undefined
      */
      
      this.#cScale = d3
        .scaleBand()
        .domain(this.#data.map(d => d[this.#cSeries]))
        .range([this.#margins.l, this.#width-this.#margins.l-this.#margins.r]);
        
      // Adjust for horizontal bar graphs
      if (!this.#vertical) {
        this.#cScale = this.#cScale
          .range([this.#margins.t, this.#height-this.#margins.b]);
      }
    }
    initAxes(cAxisOptions = {}, nAxisOptions = {}) {
      /*
      This function initialises the bottom and left scales for the bar graph
      
      Parameters
      -----------------
      cAxisOptions/nAxisOptions (type: object)
      - Objects with settings to configure the categorical and numerical axes. 
      - Input settings as key-value pairs in the objects. 
      - Valid keys are `ticks`, `tickValues`, `tickFormat`, `tickPadding`, and
        `tickSize`.
      - See d3.js documentation for valid values;
      - Also note that this function relies on #cScale and #nScale. 
        Make sure these are initialised.
        
      Returns
      -----------------
      undefined
      */
        
      // Create axes
      let n = d3.axisLeft(this.#nScale);
      let c = d3.axisBottom(this.#cScale);
      
      if (!this.#vertical) {
        n = d3.axisBottom(this.#nScale);
        c = d3.axisLeft(this.#cScale);
      }
      
      // Set options
      function setOptions (ax, obj) {
        if (obj.ticks) ax.ticks(obj.ticks);
        if (obj.tickValues) ax.tickValues(obj.tickValues);
        if (obj.tickFormat) ax.tickFormat(obj.tickFormat);
        if (obj.tickPadding) ax.tickPadding(obj.tickPadding);
        if (obj.tickSize) ax.tickSize(obj.tickSize);
      }
      
      setOptions(n, nAxisOptions);
      setOptions(c, cAxisOptions);
      
      this.#axisGens = {c, n};
    }
    initBarWidth() {
      /*
      Computes width of each bar
      
      Parameters
      ---------------
      undefined
      - Though note that this method relies on #margins, #width, 
        #data, #grouped, and #padding. Initialise those as you'd like first
        
      Returns
      ---------------
      undefined
      */
      
      let numBlocks = this.#data.length;
      if (this.#grouped) numBlocks *= this.#nSeries.length;
      
      // Compute bar width (to render bars)
      let lengthPerBlock = (this.#width - this.#margins.l - this.#margins.r) 
        / numBlocks;
      
      if (!this.#vertical) {
        lengthPerBlock = (this.#height - this.#margins.t - this.#margins.b)
          / numBlocks;
      }  
      
      this.#barWidth = lengthPerBlock * (1 - this.#padding);
    }
    init() {
      /* 
      This is a generic method that calls all the above methods
      with default parameters. Ie. It initialises a default cScale, nScale,
      stack, barWidth, cAxis, and nAxis. 
      
      Feel free to call this and then some of the more specific methods above
      to adjust a certain variable (ex: the axes only or the cScale only)
      
      Parameters: 
      -------------------
      undefined
      
      Returns:
      -------------------
      undefined
      */
      
      this.initStack();
      this.initNScale();
      this.initCScale();
      this.initAxes();
      this.initBarWidth();
    }
    
    clear() {
      /* 
      Clears all contents of the SVG container and wrapper
      */ 
      
      this.#wrapper
        .select('div.tooltip')
        .remove();
      this.#container
        .selectAll("*")
        .remove();
    }
    render() {
      // Render chart titles
      this.#renderTitles();
      
      // Render legends
      this.#renderLegends();
      
      // Render tooltips
      let tooltipEnter, tooltipLeave, tooltipMove;
      if (this.#tooltips) {
        [tooltipEnter, tooltipLeave, tooltipMove] = this.#renderTooltips();
      }
      
      // Render bars
      this.#renderBars(tooltipEnter, tooltipLeave, tooltipMove);
      
      // Render axes
      this.#renderAxes();
    }
    
    // =============== HELPER METHODS (PRIVATE) ===================
    #renderBars(tooltipEnter, tooltipLeave, tooltipMove) {
      // Add SVG subgroup
      const bars = this.#container
        .append('g')
        .attr('class', 'bars');
        
      // Save private fields (can't access 'this' when rendering bars)
      const cSeries = this.#cSeries;
      const nSeries = this.#nSeries;
      const nScale = this.#nScale;
      const cScale = this.#cScale;
      const barWidth = this.#barWidth;
      const graphWidth = this.#width;
      const barLabels = this.#barLabels;
      
      // Vertical / horizontal adjustment
      const vertical = this.#vertical;
      const x = vertical ? 'x' : 'y';
      const y = vertical ? 'y' : 'x';
      const h = vertical ? 'height' : 'width';
      const w = vertical ? 'width' : 'height';
      
      // Create subgroups for each bar series
      const first = this.#vertical ? 0 : 1;
      const last = this.#vertical ? 1 : 0;
      
      // for stacked bar graphs
      if (!this.#grouped) {
        bars
        .selectAll('g')
        .data(this.#stackData)
        .join('g')
        .attr('class', d => d.key)
        // Create bars for each bar series
        .each(function(d) {
          d3.select(this)
            .selectAll('rect')
            .data(d)
            .join('rect')
            .attr(x, d => cScale(d.data[cSeries]) )
            .attr(y, d => nScale(d[last]))
            .attr(h, d => nScale(d[first]) - nScale(d[last]))
            .attr(w, barWidth)
            // Add event listeners
            .on('mouseenter', tooltipEnter)
            .on('mouseleave', tooltipLeave)
            .on('mousemove', tooltipMove);
            
          // creates bar labels
          if (barLabels) {
            d3.select(this)
              .selectAll('text')
              .data(d)
              .join('text')
              .attr('class', 'bar-label')
              .attr(x, d => cScale(d.data[cSeries]) )
              .attr(y, d => {
                const input = (typeof d[last] !== 'number') ? 0 : d[last];
                return nScale(input) + (vertical ? -10 : 10)
              })
              .text(d => (typeof d[last] !== 'number') ? 'NA' : d[last]);
          }
        });  
      } 
      
      // for grouped bar graphs
      else {
        bars
        // Create groups
        .selectAll('g')
        .data(this.#data)
        .join('g')
        // Create bars for each group
        .each(function(d) {
          let numericalSeries = []; 
          Object.keys(d).forEach(k => {
            if (nSeries.includes(k))
              numericalSeries.push({'cat': d[cSeries], 'type': k, 'val': d[k]});
          });
          
          // Background bar
          d3.select(this)
            .append('g')
            .attr('class', 'background')
              .append('rect')
                .attr(x, cScale(d[cSeries]))
                .attr(y, nScale(0))
                .attr(h, graphWidth - nScale(0))
                .attr(w, barWidth * numericalSeries.length)
                .attr('fill', 'white');
          
          // Foreground bar
          d3.select(this)
            .append('g')
            .attr('class', 'foreground')
              .selectAll('rect')
              .data(numericalSeries)
              .join('rect')
              .attr(x, (d,i) => cScale(d.cat) + i*barWidth )
              .attr(y, nScale(0))
              .attr(h, d => nScale(d.val) - nScale(0))
              .attr(w, barWidth)
              .attr('class', d => d.type);
          
          // creates bar labels
          if (barLabels) {
            d3.select(this)
              .selectAll('text')
              .data(numericalSeries)
              .join('text')
              .attr('class', 'bar-label')
              .attr(x, (d,i) => cScale(d.cat) + (i+1)*barWidth - barWidth/3.2)
              .attr(y, d => {
                const input = (typeof d.val !== 'number') ? 0 : d.val;
                return nScale(input) + (vertical ? -10 : 10);
              })
              .text(d => (typeof d.val !== 'number') ? 'NA' : d.val);
          }
          
          // Add event listeners
          d3.select(this)
            .on('mouseenter', tooltipEnter)
            .on('mouseleave', tooltipLeave)
            .on('mousemove', tooltipMove);
        })
      }
      
    }
    #renderAxes() {
      // Create subgroup
      const axes = this.#container
        .append('g')
        .attr('class', 'axes');
        
      // Render vertical axis
      const v = this.#vertical ? 'n' : 'c'; 
      axes
        .append('g')
          .attr('class', v)
          .attr('transform', `translate(${this.#margins.l},0)`)
          .call(this.#axisGens[v]);
        
      // Render horizontal axis
      const h = this.#vertical ? 'c' : 'n';
      const height = this.#vertical ? 
        this.#height - this.#margins.b : 
        this.#height - this.#margins.b;
      
      axes
        .append('g')
          .attr('class', h)
          .attr('transform', `translate(0, ${height})`)
          .call(this.#axisGens[h]);
    }
    #renderTitles() {
      // Create subgroup 
      const titles = this.#container
        .append('g')
        .attr('class', 'titles');
      
      // Render chart title
      titles
        .append('text')
          .attr('class', 'graph-title')
          .attr('x', this.#margins.l + (this.#width - this.#margins.l)/2 )
          .attr('y', this.#vertical ? this.#margins.t/2 : this.#margins.t/4)
          .attr('text-anchor', 'middle')
          .text(this.#graphTitle);
      
      const v = this.#vertical ? 'n' : 'c';
      const s = this.#vertical ? this.#margins.l/2.5 : 40;
      
      // Render axis titles
      titles
        .append('text')
          .attr('class', v+'-axis-title')
          .attr('x', s)
          .attr('y', this.#margins.t + (this.#height - this.#margins.t - this.#margins.b)/2)
          .attr('text-anchor', 'middle')
          .attr('transform', `rotate(-90, ${s}, 
            ${this.#margins.t + (this.#height - this.#margins.t - this.#margins.b)/2} )`)
          .text(this.#vertical ? this.#nAxisTitle : this.#cAxisTitle);
      
      // Make responsive for vertical vs. horizontal bars. 
      const height = this.#vertical ? 
        this.#height - this.#margins.b/1.75 : 
        this.#height - this.#margins.b/3;
      const h = this.#vertical ? 'c' : 'n';
        
      titles
        .append('text')
          .attr('class', h+'-axis-title')
          .attr('x', this.#margins.l + 
            (this.#width - this.#margins.l - this.#margins.r)/2.25)
          .attr('y', height)
          .attr('text-anchor', 'end')
          .text(this.#vertical ? this.#cAxisTitle : this.#nAxisTitle);
    }
    #renderLegends() {
      // Create subgroup
      const legend = this.#container
        .append('g')
        .attr('class', 'legend');
      const r = this.#legendRadius;
        
      // Make responsive for vertical vs. horizontal bars. 
      const height = this.#vertical ? 
        this.#height - this.#margins.b/2 : 
        this.#margins.t / 2;
        
      // Render legend
      const textOffset = 4*r;
      
      legend
        .selectAll('circle')
        .data(this.#stackData)
        .join('circle')
        .attr('r', r)
        .attr('cx', (_,i) => this.#width * 0.35 + 2*r + 16*i*r)
        .attr('cy', height)
        .attr('class', d => d.key);
        
      legend
        .selectAll('text')
        .data(this.#stackData)
        .join('text')
        .attr('class', d => d.key)
        .attr('text-anchor', 'start')
        .attr('x', (_,i) => this.#width * 0.35 + textOffset + 16*i*r)
        .attr('y', height + 0.3*r)
        .text(d => d.key);
    }
    #renderTooltips() {
      /*
      This function adds a tooltip box to the graph's wrapper
      and returns event handlers needed to control it.
      
      Parameters
      ---------------------
      undefined
      
      Returns
      ---------------------
      array
      - An array of three functions that handle the following events:
        onMouseEnter, onMouseLeave, and onMouseMove
      - These event handlers are meant to be added to the graph's bars.
      */
      
      // Grab field. Won't be able to access this keyword later
      const tooltipSeries = this.#tooltipSeries ? 
        this.#tooltipSeries : 
        [this.#cSeries, ...this.#nSeries];
      
      // Create tooltip element
      const tooltip = this.#wrapper
        .append('div')
          .attr('class', 'tooltip')
          .style('opacity', 0);
      
      // Create event handlers
      function onEnter(e, d) {
        if (!Object.keys(d).includes('data')) d.data = d;
  
        // Get series
        let html = ''; 
        for (let s of tooltipSeries) {
          html += s.charAt(0).toUpperCase() + s.slice(1);
          html += ': ' + (d.data[s] !== null ? d.data[s] : 'NA');
          html += ' <br /> ';
        }
        
        tooltip
          .html(html)
          .style("opacity", 1)
      }
      function onLeave(e, d) {
        tooltip.style('opacity', 0);
      }
      function onMove(e, d) {
        tooltip
          .style("transform",`translateX(25px)`)
          .style("left",`${(e.clientX)}px`)
          .style("top",`${(e.clientY)}px`)
      }
      
  
      return [onEnter, onLeave, onMove];
    }
    
    dataMinMax() {
      /* 
      Gets min and max values in dataset 
      
      Parameters
      --------------------
      undefined, but relies on #grouped, #stackData, and #nSeries. 
      Please initialise these values before calling this method.
      */
      
      let min, max;
      
      // computes min max across stack data
      if (this.#grouped !== true) {
        // Shorten var names
        let minArr = this.#stackData[0];
        let maxArr = this.#stackData[this.#stackData.length - 1];
        
        // Get min of stack data points
        min = minArr[0][0];
        
        for (let i=0; i<minArr.length; i++) {
          if (minArr[i][0] < min) {
            min = minArr[i][0];
          }
        }
        
        // Get max of stack data points
        max = maxArr[0][1];
        
        for (let i=0; i<maxArr.length; i++) {
          if (maxArr[i][1] > max) {
            max = maxArr[i][1]
          }
        }
      } 
      
      // computes min max across raw data
      else {
        min = this.#data[0][this.#nSeries[0]];
        max = this.#data[0][this.#nSeries[0]];
        
        for (let i = this.#data.length - 1; i > -1; i--) {
          for (let j = this.#nSeries.length - 1; j > -1; j--) {
            const curr = this.#data[i][this.#nSeries[j]];
            if (curr > max) max = curr;
            if (curr < min) min = curr;
          }
        }
      }
      
      return [min, max];
    }
  }