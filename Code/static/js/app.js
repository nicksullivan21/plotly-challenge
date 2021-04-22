function buildchart(sample){
    // Read in samples data using D3 library
    d3.json("../data/samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        console.log(otu_labels)
        var sample_values = result.sample_values;

        // Create horizontal bar chart
        data = [{
            type: "bar",
            orientation: "h",
            x: otu_ids.slice(0, 10),
            y: sample_values.slice(0, 10),
            text: otu_labels.slice(0, 10)}];

            var layout = {
                title: 'Test Subject Horizontal Bar Chart Microbe Data',
                showlegend: false,
                height: 400,
                width: 500
            };
        
        Plotly.newPlot("bar", data, layout);

        // Create bubble chart
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
                color: otu_ids,
                size: sample_values,
                opacity: [1, 0.8, 0.6, 0.4],
                size: [40, 60, 80, 100]
            }
        };

        var bubbleData = [trace1];
        console.log(otu_ids)
        var layout = {
            title: 'Test Subject Bubble Chart Microbe Data',
            showlegend: false,
            height: 600,
            width: 1400
        };

        Plotly.newPlot('bubble', bubbleData, layout);   
    })
}

// Display sample metadata
function buildmetadatadisplay(sample){
    d3.json("../data/samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var sample_metadata = d3.select("#sample-metadata");
        sample_metadata.hmtl("");
        Object.defineProperties(result).forEach(([key,value]) => {
            sample_metadata.append("h6").text(key+" : "+ value)
        })
    })
}

//6. Update all of the plots any time that a new sample is selected.
function dropdownupdate(sample){
    d3.json("../data/samples.json").then((data) => {
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