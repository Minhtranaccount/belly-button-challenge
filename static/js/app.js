// Read the url
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
d3.json(url).then(function(data) 
{

    // Create variables to hold the arrays of data
    let samples = data.samples;
    let metadata = data.metadata;
    let names = data.names;

    // Add Test Subject ID No. to the dropdown menu

    names.map((name) => {d3.select("#selDataset").append("option").text(name).property("value", name);});

    // Create the initial page with default graphs
    function init() {

        // Set initial sample ID
        let default_data  = samples[0];
        console.log(default_data);

        // Select values in the default dataset to plot
        let default_values = default_data.sample_values; 
        let default_id = default_data.otu_ids; 
        let default_labels = default_data.otu_labels; 

        // Select top 10 OTUs with their samples values, otu id and otu labels in the correct order to plot bar chart
        let top_ten_values = default_values.slice(0,10).reverse();
        let top_ten_id = default_id.slice(0,10).reverse();
        let top_ten_labels = default_labels.slice(0,10).reverse();

        //Plot a bar chart of the top ten
        bardata = [{
        y: top_ten_id.map(item =>`OTU ${item}`),
        x: top_ten_values,
        text: top_ten_labels,
        type: "bar",
        orientation: "h"}];
            
        barlayout = {
        title: `<b>Top 10 OTUs<b>`,
        xaxis: { title: "Sample Value"},
        width: 500,
        height: 550};

        Plotly.newPlot("bar", bardata, barlayout);
        
        // Bubble Chart
        let bubbledata =[{
        x: default_id,
        y: default_values,
        mode: 'markers',
        marker: {color: default_id,
                size: default_values,
                colorscale:"Earth"}}];

        let bubblelayout = {
        title: '<b>Sample Values of OTU IDs<b>',
        xaxis: { title: "OTU ID"},
        yaxis: { title: "Sample Value"}, 
        showlegend: false};

        Plotly.newPlot("bubble", bubbledata, bubblelayout);


        // Demographic Info
        default_metadata = metadata[0];
        
        for (key in default_metadata){d3.select("#sample-metadata").append("p").text(`${key}: ${default_metadata[key]}`)};
    };

    init();


    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", updatePlotly);

    function updatePlotly(){

        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");

        // Assign the value of the dropdown menu option to a variable
        let inputValue = dropdownMenu.property("value");

        // Filter the database based on the input Value ID
        let dataset = data.samples.filter(sample => sample.id === inputValue)[0];
        console.log(dataset);

        // Select all sample values, otu ids and otu labels of the selected test ID

        let values = dataset.sample_values; 
        let id = dataset.otu_ids; 
        let labels = dataset.otu_labels; 

        // Select top 10  sample values, otu ids and otu labels of the selected test ID

        let top_values = values.slice(0,10).reverse();
        let top_id = id.slice(0,10).reverse();
        let top_labels = labels.slice(0,10).reverse();

        // Bar Chart
        Plotly.restyle("bar", "x", [top_values]);
        Plotly.restyle("bar", "y", [top_id.map(outId => `OTU ${outId}`)]);
        Plotly.restyle("bar", "text", [top_labels]);


        // Bubble Chart
        Plotly.restyle('bubble', "x", [id]);
        Plotly.restyle('bubble', "y", [values]);
        Plotly.restyle('bubble', "text", [labels]);
        Plotly.restyle('bubble', "marker.color", [id]);
        Plotly.restyle('bubble', "marker.size", [values]);

        // Demograhic Info
        metainfo = data.metadata.filter(sample => sample.id == inputValue)[0];
        
        // Clear out current contents in the panel
        d3.select("#sample-metadata").html("");

        // Display each key-value pair from the metadata JSON object
        for (key in metainfo){d3.select("#sample-metadata").append("p").text(`${key}: ${metainfo[key]}`)};
        
    }
});