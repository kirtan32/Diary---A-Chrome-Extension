//localStorage.setItem('notediary', JSON.stringify(new Array));


//new colors "#E74C3C","#8E44AD" 
const titleColors=["#FFF000","#08E8DE","#66FF00","#1DA1F2","#FF007F","#9999CC","#D35400"];
var defaultColor=3;
var TitleColorVar=defaultColor;
var currentNoteID="-1";
var Deletecounter="1";

//var counterofclick=0;
// this is for when edit button is clicked

function getDate() {
    var a = new Date,
        b = Array(7),
        c = Array(12);
    b[0] = "SUN";b[1] = "MON";b[2] = "TUE";
    b[3] = "WED";b[4] = "THU";b[5] = "FRI";
    b[6] = "SAT";
    c[0] = "JAN";c[1] = "FEB";c[2] = "MAR";
    c[3] = "APR";c[4] = "MAY";c[5] = "JUNE";
    c[6] = "JULY";c[7] = "AUG";c[8] = "SEPT";
    c[9] = "OCT";c[10] = "NOV";c[11] = "DEC";
    
    b = b[a.getDay()];
    c = c[a.getMonth()];
    a = a.getDate();
    return c + " " + a + " , " + b
}
function getTime() {
    var a = new Date;
    return (10 > a.getHours() ? "0" : "") + a.getHours() + ":" + (10 > a.getMinutes() ? "0" : "") + a.getMinutes() + ":" + (10 > a.getSeconds() ? "0" : "") + a.getSeconds()
}

function setNoteTitleColor()
{
    var id = this.getAttribute('id');
    TitleColorVar=id;
    document.getElementById('noteCaption').style.color=titleColors[TitleColorVar];
    document.getElementById('hr1').style.backgroundColor=titleColors[TitleColorVar];
    document.getElementById('hr2').style.backgroundColor=titleColors[TitleColorVar];
    
    var notedata;
    var titledata=document.getElementById("noteCaption").value.trim();
    if(titledata.length==0)
    {
        titledata="UNTITLED NOTE";
    }
    var id_note=""+get_notes().length;
    if(currentNoteID!="-1")
    {
        id_note=currentNoteID;
    }
    notedata={
        id: id_note,
        title:titledata,
        context:document.getElementById("noteContext").value,
        date:getDate(),
        color:TitleColorVar
    };
    currentNoteID=id_note;

    //document.getElementById('hr1').style.backgroundColor=titleColors[4];
    //document.getElementById('hr2').style.backgroundColor=titleColors[4];
    
    saveNotedata(notedata);

}

function setTitleColors()
{
    var tcolor = '';
    for(var i=0;i<titleColors.length;i++)
    {
        tcolor+='<button id="'+i+'" class="ColorButton" style="background-color: '+titleColors[i]+';"></button>';
    }
    
    document.getElementById('titleColor').innerHTML = tcolor;
    var buttons = document.getElementsByClassName('ColorButton');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', setNoteTitleColor);
    };
}
function SetNewNote()
{
    setTitleColors();
    TitleColorVar=defaultColor;
    document.getElementById('noteCaption').style.color=titleColors[defaultColor];
    document.getElementById('noteCaption').value=null;
    document.getElementById('hr1').style.backgroundColor=titleColors[defaultColor];
    document.getElementById('hr2').style.backgroundColor=titleColors[defaultColor];
    document.getElementById('noteContext').value=null;
    document.getElementById('noteContext').focus();
    
}

function saveNotedata(notedata)
{
    var b = get_notes();
    var counter=0;
    for(var i=0;i<b.length;i++)
    {
        if(b[i].id==notedata.id)
        {
            b[i].title=notedata.title.toUpperCase();
            b[i].context=notedata.context;
            b[i].date=notedata.date;
            b[i].color=notedata.color;
            counter=1;
            break;
        }
    }
    if(counter==0)
    {
        b.push(notedata);
    }
    localStorage.setItem('notediary', JSON.stringify(b));
    
}

var timer=0;
function autoSaveNote()
{
    document.getElementById("noteCaption").addEventListener("keyup",function(event){
        clearTimeout(timer);
        timer=setTimeout(function (){

            var notedata;
            var titledata=document.getElementById("noteCaption").value.trim();
            if(titledata.length==0)
            {
                titledata="UNTITLED NOTE";
            }
            var id_note=""+get_notes().length;
            if(currentNoteID!="-1")
            {
                id_note=currentNoteID;
            }
            notedata={
                id: id_note,
                title:titledata,
                context:document.getElementById("noteContext").value,
                date:getDate(),
                color:TitleColorVar
            };
            currentNoteID=id_note;

            //document.getElementById('hr1').style.backgroundColor=titleColors[4];
            //document.getElementById('hr2').style.backgroundColor=titleColors[4];
            
            saveNotedata(notedata);

        }, 500);
    });
    document.getElementById("noteContext").addEventListener("keyup",function(event){
        clearTimeout(timer);
        timer=setTimeout(function (){

            var notedata;
            var titledata=document.getElementById("noteCaption").value.trim();
            if(titledata.length==0)
            {
                titledata="UNTITLED NOTE";
            }
            var id_note=""+get_notes().length;
            if(currentNoteID!="-1")
            {
                id_note=currentNoteID;
            }
            notedata={
                id: id_note,
                title:titledata,
                context:document.getElementById("noteContext").value,
                date:getDate(),
                color:TitleColorVar
            };
            currentNoteID=id_note;

            //document.getElementById('hr1').style.backgroundColor=titleColors[0];
            //document.getElementById('hr2').style.backgroundColor=titleColors[0];
    
            saveNotedata(notedata);

        }, 500);
    });
    /*document.getElementsByClassName("noteCaption","noteContext").addEventListener("keyup",function(event)
    {
        clearTimeout(timer);
        timer=setTimeout(function (){

            var tempVar;
            document.getElementById('hr1').style.backgroundColor=titleColors[4];
    
        }, 500);
    });*/
}

function get_notes() {
    var notes = new Array;
    var notes_str = localStorage.getItem('notediary');
    if (notes_str != null) {
        notes = JSON.parse(notes_str);
    }
    return notes;
}
function setNoteOnClick()
{
    var Noteid = this.getAttribute('id');
    currentNoteID=""+Noteid;
    getNoteDivOnClick();
    var notes=get_notes();
    var i=0;
    for(i=0;i<notes.length;i++)
    {
        if(notes[i].id==Noteid)
        {
            break;
        }
    }
    TitleColorVar=notes[i].color;
    document.getElementById('noteCaption').style.color=titleColors[notes[i].color];
    document.getElementById('noteCaption').value=notes[i].title;
    document.getElementById('hr1').style.backgroundColor=titleColors[notes[i].color];
    document.getElementById('hr2').style.backgroundColor=titleColors[notes[i].color];
    document.getElementById('noteContext').value=notes[i].context;
    document.getElementById('noteContext').focus();
    
}

function setList(){
    var notes = get_notes();

    var noteVar = '';
    for(var i=0;i<notes.length;i++)
    {
        noteVar+='<div class="note" id="'+notes[i].id+'" style="background-color: '+titleColors[notes[i].color]+';">'+
                    '<span class="delete" id="'+notes[i].id+'" title="Delete"></span>'+
                    '<span class="title" id="title">'+notes[i].title+'</span>'+
                    '<span class="date">'+notes[i].date+'</span>'+
                    '<span class="sort" title="Move"></span>'+
                '</div>';
        
    }
    if(notes.length==0||notes==null)
    {
        noteVar='<h2 style="color:gray;">No Notes Available</h3>';
    }
    document.getElementById('tasklist').innerHTML = noteVar;
    
    var divNotes = document.getElementsByClassName('note');
    for (var i=0; i < divNotes.length; i++) {
        divNotes[i].addEventListener('click', setNoteOnClick);
    };

    // var delNotes = document.getElementsByClassName('delete');
    // for (var i=0; i < delNotes.length; i++) {
    //     delNotes[i].addEventListener('click', deleteNote);
    // };
    
}
// if contentLeft then Var is 1, contentRight then Var is 2
var contentVar=1;

function getHome(){
        if(Deletecounter==2)
        {
            document.getElementById('footerLeft').click();
        }
        clearSearch();
        
        document.getElementById('contentLeft').style.display='block';
        document.getElementById('contentRight').style.display='none';
        contentVar=1;
        setList();

}
function getNoteDivOnClick()
{
    if(contentVar!=2)
    {
        clearSearch();
        
        document.getElementById('contentLeft').style.display='none';
        document.getElementById('contentRight').style.display='block';
        contentVar=2;
        //currentNoteID="-1";
        setTitleColors();

    }
}
function getNewNote(){
    if(contentVar!=2)
    {
        if(Deletecounter==2)
        {
            document.getElementById('footerLeft').click();
        }
        clearSearch();
        
        document.getElementById('contentLeft').style.display='none';
        document.getElementById('contentRight').style.display='block';
        contentVar=2;
        currentNoteID="-1";
        SetNewNote();
        
    }
}
function getSearchedNotes(SearchText)
{
    var b=[];
    var notesData=get_notes();
    let s_text = SearchText.toLowerCase();
    for(var i=0;i<notesData.length;i++)
    {
        let t_data=notesData[i].title.toLowerCase();
        let c_data=notesData[i].context.toLowerCase();
        let b1=t_data.includes(s_text);
        let b2=c_data.includes(s_text);
        if( b1 || b2)
        {
            b.push(notesData[i]);
        }
    }
    return b;
}

function autoSearchNote()
{
    document.getElementById("searchItem").addEventListener("input",function(){
        
        document.getElementById('clearBtn').style.display="block";
        var SearchText=document.getElementById("searchItem").value;
        if(SearchText.length==0)
        {
            clearSearchAndSetList();
        }
        else
        {
            var noteArr = getSearchedNotes(SearchText);

            var noteVar = '';
            for(var i=0;i<noteArr.length;i++)
            {
                noteVar+='<div class="note" id="'+noteArr[i].id+'" style="background-color: '+titleColors[noteArr[i].color]+';">'+
                            '<span class="delete" id="'+noteArr[i].id+'" title="Delete"></span>'+
                            '<span class="title" id="title">'+noteArr[i].title+'</span>'+
                            '<span class="date">'+noteArr[i].date+'</span>'+
                            '<span class="sort" title="Move"></span>'+
                        '</div>';
                
            }
            if(noteArr.length==0||noteArr==null)
            {
                noteVar='<h2 style="color:gray;">No Notes Found</h3>';
            }
            document.getElementById('tasklist').innerHTML = noteVar;
            
            var divNotes = document.getElementsByClassName('note');
            for (var i=0; i < divNotes.length; i++) {
                divNotes[i].addEventListener('click', setNoteOnClick);
            };
            /*var noteVar='<h2 style="color:gray;">'+SearchText+'</h3>';
            document.getElementById('tasklist').innerHTML = ""+noteArr;
            */
        }

    });
    
}
function clearSearchAndSetList()
{
    document.getElementById('clearBtn').style.display="none";
    document.getElementById('searchItem').value="";
    setList();
}
function clearSearch()
{
    document.getElementById('clearBtn').style.display="none";
    document.getElementById('searchItem').value="";
    
}


function setNonDeletedList(){
    var notes = get_notes();
    
    var noteVar = '';
    for(var i=0;i<notes.length;i++)
    {
        noteVar+='<div class="note" id="'+notes[i].id+'" style="background-color: '+titleColors[notes[i].color]+';">'+
                    '<span class="delete" id="'+notes[i].id+'" title="Delete"></span>'+
                    '<span class="title" id="title">'+notes[i].title+'</span>'+
                    '<span class="date">'+notes[i].date+'</span>'+
                    '<span class="sort" title="Move"></span>'+
                '</div>';
        
    }
    if(notes.length==0||notes==null)
    {
        noteVar='<h2 style="color:gray;">No Notes Available</h3>';
    }
    document.getElementById('tasklist').innerHTML = noteVar;
    
    var NotesDelete = document.getElementsByClassName('delete');
    for (var i=0; i < NotesDelete.length; i++) {
        NotesDelete[i].style.display="block";
        NotesDelete[i].addEventListener('click',deleteNote);
    };

}
function deleteNote()
{
    var noteID=this.getAttribute('id');
    var notes=get_notes();
    notes.splice(noteID,1);
    for(var i=0;i<notes.length;i++)
    {
        notes[i].id=""+i;
    }
    localStorage.setItem('notediary', JSON.stringify(notes));
    setNonDeletedList();
    
}

function editNoteOnClick(){
    if(Deletecounter=="1")
    {
        Deletecounter="2";
        document.getElementById('footerLeft').style.backgroundColor="#FF007F";
        document.getElementById('searchItem').disabled=true;

        clearSearch();
        setList();
        var NotesDelete = document.getElementsByClassName('delete');
        for (var i=0; i < NotesDelete.length; i++) {
            NotesDelete[i].style.display="block";
            NotesDelete[i].addEventListener('click',deleteNote);
        };
        var divNotes = document.getElementsByClassName('note');
        for (var i=0; i < divNotes.length; i++) {
            divNotes[i].removeEventListener('click', setNoteOnClick);
            divNotes[i].style.cursor="text";
        };
        // var delNotes = document.getElementsByClassName('delete');
        // for (var i=0; i < delNotes.length; i++) {
        //     delNotes[i].addEventListener('click', deleteNote);
        // };

    }
    else
    {
        Deletecounter="1";
        document.getElementById('footerLeft').style.backgroundColor="#000000";
        document.getElementById('searchItem').disabled=false;

        var NotesDelete = document.getElementsByClassName('delete');
        for (var i=0; i < NotesDelete.length; i++) {
            NotesDelete[i].style.display="none";
            NotesDelete[i].removeEventListener('click',deleteNote);

        };
        var divNotes = document.getElementsByClassName('note');
        for (var i=0; i < divNotes.length; i++) {
            divNotes[i].addEventListener('click', setNoteOnClick);
            divNotes[i].style.cursor="pointer";
        };

    }
    //document.getElementById('footerRight').innerHTML=""+Deletecounter;
}

document.getElementById('home').addEventListener('click', getHome);

document.getElementById('addnote').addEventListener('click', getNewNote);

document.getElementById('contentLeft').style.display='block';
document.getElementById('contentRight').style.display='none';

document.getElementById('clearBtn').addEventListener('click',clearSearchAndSetList);

document.getElementById('footerLeft').addEventListener('click',editNoteOnClick);

Deletecounter="1";

//document.getElementById('searchItem').disabled=true;


autoSaveNote();
autoSearchNote();
setList();

/*
setTitleColors : is for puting buttons into title bar.

setNoteTitleColor : is for when button is clicked for title color then title color is to be set

get_notes() : is for creating Array or fetching array of notes data.

SetNewNote() : is for clicking-'+' then this method is clicked.

setList() : is for putting list of note in leftcontext.

getHome() - is called when 'home' button is clicked

getNewNote() - is called when '+' then this method is called.

localstorage : notediary : id, title, context, date, color
*/