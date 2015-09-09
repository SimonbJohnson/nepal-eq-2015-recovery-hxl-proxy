function hxlProxyToJSON(input){
    var output = [];
    var keys=[]
    input.forEach(function(e,i){
        if(i==0){
            keys = e;
        } else {
            var row = {};
            e.forEach(function(e2,i2){
                row[keys[i2]] = e2;
            });
            output.push(row);
        }
    });
    return output;
}

//function to construct hxlprxy URL

function constructHXLURL(linkList){
    var url = 'http://beta.proxy.hxlstandard.org/data.csv?filter_count=7&url=';
    linkList.forEach(function(l,i){
        if(i==0){
            url+=l+'&format=html';
        }
        if(i==1){
            url+='&filter01=append&append-dataset01-01='+l;
        }
        if(i>1){
            url+='&append-dataset01-0'+i+'='+l;
        }
    });
    url += '&filter02=replace-map&replace-map-url02=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1S9umNUolP-u_R7FYNOdHZM-g8PUcAC1xq7Y8-48bArg%2Fpub%3Fgid%3D1267882078%26single%3Dtrue%26output%3Dcsv&filter03=merge&merge-url03=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1S9umNUolP-u_R7FYNOdHZM-g8PUcAC1xq7Y8-48bArg%2Fpub%3Fgid%3D0%26single%3Dtrue%26output%3Dcsv&merge-tags03=meta%2Bid%2Cadm3%2Bcode%2Cindicator%2Bpriority&merge-keys03=adm3%2Bname&filter04=merge&merge-url04=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1S9umNUolP-u_R7FYNOdHZM-g8PUcAC1xq7Y8-48bArg%2Fpub%3Fgid%3D1687445680%26single%3Dtrue%26output%3Dcsv&merge-tags04=adm4%2Bcode&merge-keys04=adm3%2Bcode%2Cadm4%2Bname';
    return url;
}

var url = constructHXLURL(sheets);

console.log(url);

var html = 'Download complete data set: <a href="'+url+'" target="_blank">Download CSV</a>';

$('#completedownload').html(html);

var hxlProxyURL = url.replace('/data.csv?','/data/edit?');

var html = 'HXL Proxy Editor: <a href="'+hxlProxyURL+'" target="_blank">Editor</a>';

$('#hxlproxyeditor').html(html);

var districtURL = url+'&filter05=count&count-tags05=%23adm3%2Bname%2C%23org%2Bpns%2C%23sector%2C%23indicator%2Bconfirmedvdc&count-aggregate-tag05=&filter06=sort&sort-tags06=%23adm3%2Bname';

var html = 'Download district Overview: <a href="'+districtURL+'" target="_blank">Download CSV</a>';

$('#district').html(html);

var html = '<a href="http://simonbjohnson.github.io/data-quality-dashboard/index.html?url='+encodeURIComponent(url)+'" target="_blank">Data quality dashboard</a>';

$('#dataquality').html(html);

$('#updatedownloadbutton').click(function(){
    $('#updatedownload').html('Updating');
    $.ajax(url+'&force=1', {
            success: function(data) {
                $('#updatedownload').html('Updated');
            },
            error: function(e,err) {
                $('#updatedownload').html('Bad Update');
            }
    });    
});

$('#updatedistrictbutton').click(function(){
    $('#updatedistrict').html('Updating...');
    $.ajax(districtURL+'&force=1', {
            success: function(data) {
                $('#updatedistrict').html('Updated');
            },
            error: function(e,err) {
                $('#updatedistrict').html('Bad Update');
            }
    });    
});

