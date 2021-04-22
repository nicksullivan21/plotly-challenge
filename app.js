function buildchart(sample){
    // Read in samples data using D3 library
    d3.json("../data/samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var sample_values = result.sample_values;
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        // console.log(otu_ids, otu_labels, sample_values)
        

        // Create horizontal bar chart
        var y_values = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var bar_data = [{
            type: "bar",
            orientation: "h",
            x: sample_values.slice(0, 10).reverse(),
            y: y_values,
            text: otu_labels.slice(0, 10).reverse()}];

        var bar_layout = {
            showlegend: false,
            height: 500,
            width: 400
        };
        
        Plotly.newPlot("bar", bar_data, bar_layout);

        // Create bubble chart
        var bubble_data = [
            {
               x: otu_ids,
               y: sample_values,
               mode: 'markers',
               text: otu_labels,
               marker: {
                   color: otu_ids,
                   colorscale: 'Earth',
                   size: sample_values,
                   opacity: [1, 0.8, 0.6, 0.4]
                }
            }
        ];

        var bubble_layout = {
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1200
        };

        Plotly.newPlot('bubble', bubble_data, bubble_layout);   
    })
}

// Display sample metadata
function buildmetadatadisplay(sample){
    d3.json("../data/samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var sample_metadata = d3.select("#sample-metadata");
        sample_metadata.html("");
        Object.entries(result).forEach(([key,value]) => {
            sample_metadata.append("h6").text(`${key}: ${value}`);
        })
    })
}

// Update all of the plots any time that a new sample is selected
function dropdownupdate(sample){
    d3.json("data/samples.json").then((data) => {
        var selDataset = d3.select("#selDataset")
        var names = data.names
        names.forEach((name) => {
            selDataset.append("option").text(name).property("value", name)
        })
        var first_sample = names[0]
        buildchart(first_sample) 
        buildmetadatadisplay(first_sample)
    })
}
//option change function 
function optionChanged(sample){
        buildchart(sample) 
        buildmetadatadisplay(sample)
}
// dropdown update
dropdownupdate()