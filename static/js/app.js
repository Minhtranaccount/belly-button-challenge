// Read the url
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
let data = d3.json(url).then(function(data) {


    let first_value_values = data.samples[0].sample_values.slice(0,10); 
    let first_value_id = data.samples[0].otu_ids.slice(0,10); 
    let first_value_labels = data.samples[0].otu_labels.slice(0,10); 
    console.log(first_value_values );
    console.log(first_value_id);
    console.log(first_value_labels);

    // Initialises the page with a default plot
    function init() {
      data = [{
        y: first_value_id.map(item =>`OTU ${item}`).reverse(),
        x: first_value_values.reverse(),
        text: first_value_labels.reverse(),
        type: "bar",
        orientation: "h"}];
    
      Plotly.newPlot("bar", data);
    };

    // Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");

  // Initialise x and y arrays
  let x = [];
  let y = [];
  let text = []
  for (let i =0; i < data.samples.length; i++){
  if (data.samples[i].selected) {
    x = data.samples[i].sample_values.slice(0,10).map(item =>`OTU ${item}`).reverse();
    y = data.samples[i].otu_ids.slice(0,10).reverse();
    text = data.samples[i].otu_labels.slice(0,10).reverse();
  };
  };
  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle("plot", "x", [x]);
  Plotly.restyle("plot", "y", [y]);
  Plotly.restyle("plot", "text", [text]);
}

init();
});
 


// --------------------------------------------------------------------------------
// PLOT HORIZONTAL BAR CHART WITH DROPDOWN VALUE OF TOP 10 OTUs 
// --------------------------------------------------------------------------------


// data['samples'][1]["otu_ids"]








