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
            url+=l+'&strip-headers=on&format=html';
        }
        if(i==1){
            url+='&filter01=append&append-dataset01-01='+l;
        }
        if(i>1){
            url+='&append-dataset01-0'+i+'='+l;
        }
    });
    return url//+'&force=1';
}

var url = constructHXLURL(sheets);

console.log(url);

var html = 'Download complete data set: <a href="'+url+'" target="_blank">Download CSV</a>';

$('#completedownload').html(html);

var hxlProxyURL = url.replace('/data.csv?','/data/edit?');

var html = 'HXL Proxy Editor: <a href="'+hxlProxyURL+'" target="_blank">Editor</a>';

$('#hxlproxyeditor').html(html);

var districtURL = url+'&filter02=count&count-tags02=%23adm3%2Bname%2C%23org%2Bpns%2C%23sector%2C%23indicator%2Bconfirmedvdc&count-aggregate-tag02=&filter03=sort&sort-tags03=%23adm3%2Bname';

var html = 'Download district Overview: <a href="'+districtURL+'" target="_blank">Download CSV</a>';

$('#district').html(html);

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

