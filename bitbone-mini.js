!function(a,b,c,d){"use strict";var e=c.Model.extend({initialize:function(a,c){var d=b.createApplication();this.initApplication(a,c,d),this.api=d,this.initialized=!0},initApplication:function(a,b,c){var e=this;c.addHasActiveEngineObserver(function(a){e.set("hasActiveEngine",a,{observed:!0})}),this.on("change:hasActiveEngine",function(a,b,c){c.observed||this.initialized&&(b?this.deactivateEngine():this.activateEngine())}),c.addSelectedModeObserver(function(a){e.set("selectedMode",a,{observed:!0})},d.isNumber(b.selectedModeMaxChars)?b.selectedModeMaxChars:12,d.isString(b.selectedModeFallbackText)?b.selectedModeFallback:"")},activateEngine:function(){this.api.activateEngine()},arrowKeyDown:function(){this.api.arrowKeyDown()},arrowKeyLeft:function(){this.api.arrowKeyLeft()},arrowKeyRight:function(){this.api.arrowKeyRight()},arrowKeyUp:function(){this.api.arrowKeyUp()},copy:function(){this.api.copy()},cut:function(){this.api.cut()},deactivateEngine:function(){this.api.deactivateEngine()},"delete":function(){this.api["delete"]()},duplicate:function(){this.api.duplicate()},enter:function(){this.api.enter()},escape:function(){this.api.escape()},focusPanelAbove:function(){this.api.focusPanelAbove()},focusPanelBelow:function(){this.api.focusPanelBelow()},focusPanelToLeft:function(){this.api.focusPanelToLeft()},focusPanelToRight:function(){this.api.focusPanelToRight()},nextPerspective:function(){this.api.nextPerspective()},paste:function(){this.api.paste()},previousPerspective:function(){this.api.previousPerspective()},redo:function(){this.api.redo()},rename:function(){this.api.rename()},selectAll:function(){this.api.selectAll()},selectNone:function(){this.api.selectNone()},setPerspective:function(a){this.api.setPerspective(a)},toggleAutomationEditor:function(){this.api.toggleAutomationEditor()},toggleBrowserVisibility:function(){this.api.toggleBrowserVisibility()},toggleDevices:function(){this.api.toggleDevices()},toggleFullScreen:function(){this.api.toggleFullScreen()},toggleMixer:function(){this.api.toggleMixer()},toggleNoteEditor:function(){this.api.toggleNoteEditor()},undo:function(){this.api.undo()},zoomIn:function(){this.api.zoomIn()},zoomOut:function(){this.api.zoomOut()},zoomToFit:function(){this.api.zoomToFit()},zoomToSelection:function(){this.api.zoomToSelection()}},{create:function(a){return new e(a)}});a.bitbone||(a.bitbone={}),a.bitbone.Application=e}(this,host,Backbone,_),function(a,b,c,d){"use strict";var e=c.Model.extend({initialize:function(a,c){var e=b.createArranger(d.isNumber(c.screenIndex)?c.screenIndex:0);this.initArranger(a,c,e),this.api=e,this.initialized=!0},initArranger:function(a,b,c){var d=this;c.addCueMarkerVisibilityObserver(function(a){d.set("cueMarkerVisibility",a,{observed:!0})}),this.on("change:cueMarkerVisibility",function(a,b,c){c.observed||this.initialized&&this.toggleCueMarkerVisibility()}),c.addPlaybackFollowObserver(function(a){d.set("playbackFollow",a,{observed:!0})}),this.on("change:playbackFollow",function(a,b,c){c.observed||this.initialized&&this.togglePlaybackFollow()}),c.addTrackRowHeightObserver(function(a){d.set("trackRowHeight",a,{observed:!0})}),this.on("change:trackRowHeight",function(a,b,c){c.observed||this.initialized&&this.toggleTrackRowHeight()})},toggleCueMarkerVisibility:function(){this.api.toggleCueMarkerVisibility()},togglePlaybackFollow:function(){this.api.togglePlaybackFollow()},toggleTrackRowHeight:function(){this.api.toggleTrackRowHeight()}},{create:function(a){return new e(a)}});a.bitbone||(a.bitbone={}),a.bitbone.Arranger=e}(this,host,Backbone,_),function(a,b,c,d){"use strict";var e=c.Model.extend({initialize:function(a,b,c){this.initBooleanValue(a,b,c),this.api=c,this.initialized=!0},initRangedValue:function(a,b,c){var e=this;this.range=d.isNumber(b.range)?b.range:128,c.addValueObserver(this.range,function(a){e.set("value",a,{observed:!0})}),this.on("change:value",function(a,b,e){e.observed||this.initialized&&c.set(b,d.isNumber(e.range)?e.range:this.range)})},inc:function(a,b){var c=d.isNumber(b)?b:this.range;this.api.inc(a,c)}},{create:function(a,b){return new e(null,b,a)}}),f=c.Collection.extend({model:e});a.bitbone||(a.bitbone={}),a.bitbone.RangedValue=e,a.bitbone.RangedValueCollection=f}(this,host,Backbone,_),function(a,b,c,d){"use strict";var e=a.bitbone.RangedValue,f=e.extend({initialize:function(a,b,c){this.initAutomatableRangedValue(a,b,c),this.api=c,this.initialized=!0},initAutomatableRangedValue:function(a,b,c){var e=this;this.initRangedValue(a,b,c),c.addNameObserver(d.isNumber(b.nameMaxChars)?b.nameMaxChars:12,d.isString(b.nameFallback)?b.nameFallback:"",function(a){e.set("name",a,{observed:!0})}),c.addValueDisplayObserver(d.isNumber(b.textMaxChars)?b.textMaxChars:12,d.isString(b.textFallback)?b.textFallback:"",function(a){e.set("text",a,{observed:!0})})},reset:function(){this.api.reset()},setIndication:function(a){this.api.setIndication(a)},setLabel:function(a){this.api.setLabel(a)},touch:function(a){this.api.touch(a)}},{create:function(a,b){return new f(void 0,b,a)}}),g=c.Collection.extend({model:f});a.bitbone||(a.bitbone={}),a.bitbone.AutomatableRangedValue=f,a.bitbone.AutomatableRangedValueCollection=g}(this,host,Backbone,_),function(a,b,c,d){"use strict";var e=a.bitbone.RangedValue,f=e.extend({initialize:function(a,b,c){this.initBeatTime(a,b,c),this.api=c,this.initialized=!0},initBeatTime:function(a,b,c){var e=this;this.initRangedValue(a,b,c),c.addRawValueObserver(function(a){e.set("rawValue",a,{observed:!0})}),this.on("change:rawValue",function(a,b,c){c.observed||this.initialized&&this.api.setRaw(b)}),c.addTimeObserver(d.isString(b.timeSeparator)?b.timeSeparator:".",1,1,1,0,function(a){e.set("text",a,{observed:!0})})},incRaw:function(a){this.api.incRaw(a)}},{create:function(a,b){return new f(null,b,a)}});a.bitbone||(a.bitbone={}),a.bitbone.BeatTime=f}(this,host,Backbone,_),function(a,b,c){"use strict";var d=c.Model.extend({initialize:function(a,b,c){this.initBooleanValue(a,b,c),this.api=c,this.initialized=!0},initBooleanValue:function(a,b,c){var d=this;c.addValueObserver(function(a){d.set("value",a,{observed:!0})}),this.on("change:value",function(a,b,c){c.observed||this.initialized&&this.api.set(b)})},toggle:function(){this.api.toggle()}},{create:function(a,b){return new d(null,b,a)}}),e=c.Collection.extend({model:d});a.bitbone||(a.bitbone={}),a.bitbone.BooleanValue=d,a.bitbone.BooleanValueCollection=e}(this,host,Backbone,_),function(a,b,c,d){"use strict";var e=a.bitbone.BooleanValue,f=a.bitbone.AutomatableRangedValue,g=a.bitbone.AutomatableRangedValueCollection,h=c.Model.extend({initialize:function(a,b,c){this.initChannel(a,b,c),this.api=c,this.initialized=!0},initChannel:function(a,b,c){var h,i=this,j=c,k=d.isNumber(b.numSends)?b.numSends:8,l=d.isNumber(b.vuMeterRange)?b.vuMeterRange:127;j.addColorObserver(function(a,b,c){i.set("color",{R:a,G:b,B:c},{observed:!0})}),j.addIsSelectedObserver(function(a){i.set("selected",a,{observed:!0})}),j.addNameObserver(d.isNumber(b.nameMaxChars)?b.nameMaxChars:12,"",function(a){i.set("name",a,{observed:!0})}),b.useNoteEvent&&j.addNoteObserver(function(a,b,c){i.trigger("note",a,b,c)}),b.useVuMeter&&(j.addVuMeterObserver(l,0,!0,function(a){i.set("vuMeterLeft",a,{observed:!0})}),j.addVuMeterObserver(l,1,!0,function(a){i.set("vuMeterRight",a,{observed:!0})})),this.set("exists",e.create(j.exists())),this.set("mute",e.create(j.getMute())),this.set("pan",f.create(j.getPan(),{range:b.panRange}));var m=new g;for(h=0;k>h;h++)m.add(f.create(j.getSend(h),{range:b.sendRange}));this.set("sends",m),this.set("solo",e.create(j.getSolo())),this.set("volume",f.create(j.getVolume(),{range:b.volumeRange}))},select:function(){this.api.select()}},{create:function(a,b){return new h(void 0,b,a)}}),i=c.Collection.extend({model:h});a.bitbone||(a.bitbone={}),a.bitbone.Channel=h,a.bitbone.ChannelCollection=i}(this,host,Backbone,_),function(a,b,c){"use strict";var d=c.Model.extend({idAttribute:"slot",initialize:function(a,b,c){this.initClipLauncherScenesOrSlot(a,b,c),this.api=c,this.initialized=!0},initClipLauncherScenesOrSlot:function(){},launch:function(){this.api.launch(this.get("slot"))}},{create:function(a,b,c){return new e(a,b,c)}}),e=c.Collection.extend({model:d,initialize:function(a,b,c){this.initClipLauncherScenesOrSlots(a,b,c),this.api=c,this.oneBased=b.oneBase,this.initialized=!0},initClipLauncherScenesOrSlots:function(a,b,c){var d=this;c.addNameObserver(function(a,b){d.add({slot:d.slotId(a),name:b},{observed:!0,merge:!0})})},slotId:function(a){return this.oneBased?a+1:a},returnToArrangement:function(){this.api.returnToArrangement()},stop:function(){this.api.stop()}},{create:function(a,b){return new e(void 0,b,a)}});a.bitbone||(a.bitbone={}),a.bitbone.ClipLauncherScenesOrSlot=d,a.bitbone.ClipLauncherScenesOrSlots=e}(this,host,Backbone,_),function(a){"use strict";var b=a.bitbone.ClipLauncherScenesOrSlot,c=a.bitbone.ClipLauncherScenesOrSlots,d=b.extend({initialize:function(a,b,c){this.initClipLauncherScenesOrSlot(a,b,c),this.api=c,this.initialized=!0},initClipLauncherSlot:function(a,b,c){this.initClipLauncherScenesOrSlot(a,b,c)},record:function(){this.api.record(this.get("slot"))},select:function(){this.api.select(this.get("slot"))},showInEditor:function(){this.api.showInEditor(this.get("slot"))}}),e=c.extend({model:d,initialize:function(a,b,c){this.initClipLauncherSlots(a,b,c),this.api=c,this.initialized=!0},initClipLauncherSlots:function(a,b,c){var d=this;this.initClipLauncherScenesOrSlots(a,b,c),c.addColorObserver(function(a,b,c,e){d.add({slot:d.slotId(a),color:{R:b,G:c,B:e}},{observed:!0,merge:!0})}),c.addHasContentObserver(function(a,b){d.add({slot:d.slotId(a),hasContent:b},{observed:!0,merge:!0})}),c.addIsPlayingObserver(function(a,b){d.add({slot:d.slotId(a),playing:b},{observed:!0,merge:!0})}),c.addIsQueuedObserver(function(a,b){d.add({slot:d.slotId(a),queued:b},{observed:!0,merge:!0})}),c.addIsRecordingObserver(function(a,b){d.add({slot:d.slotId(a),recording:b},{observed:!0,merge:!0})}),c.addIsSelectedObserver(function(a,b){d.add({slot:d.slotId(a),selected:b},{observed:!0,merge:!0})})},createEmptyClip:function(a,b){this.api.createEmptyClip(a,b)},setIndication:function(a){this.api.setIndication(a)}},{create:function(a,b){return new e(void 0,b,a)}});a.bitbone||(a.bitbone={}),a.bitbone.ClipLauncherSlot=d,a.bitbone.ClipLauncherSlots=e}(this,host,Backbone,_),function(a,b,c,d){"use strict";var e=a.bitbone.RangedValue,f=a.bitbone.BooleanValue,g=c.Model.extend({initialize:function(a,c){var e=b.createCursorClip(d.isNumber(c.griwdWidth)?c.gridWidth:128,d.isNumber(c.griwdHeight)?c.gridHeight:128);this.initClip(a,c,e),this.api=e,this.initialized=!0},initClip:function(a,b,c){var d=this;c.addCanScrollKeysDownObserver(function(a){d.set("canScrollKeysDown",a,{observed:!0})}),c.addCanScrollKeysUpObserver(function(a){d.set("canScrollKeysUp",a,{observed:!0})}),c.addCanScrollStepsForwardObserver(function(a){d.set("canScrollStepsForward",a,{observed:!0})}),c.addPlayingStepObserver(function(a){d.set("playingStep",a,{observed:!0})}),c.addStepDataObserver(function(){}),this.set("shuffle",f.create(c.getShuffle())),this.set("accent",e.create(c.getAccent(),{range:b.accentRange}))},clearStep:function(a,b){this.api.clearStep(a,b)},scrollKeysPageDown:function(){this.api.scrollKeysPageDown()},scrollKeysPageUp:function(){this.api.scrollKeysPageUp()},scrollKeysStepDown:function(){this.api.scrollKeysStepDown()},scrollKeysStepUp:function(){this.api.scrollKeysStepUp()},scrollStepsStepBackwards:function(){this.api.scrollStepsStepBackwards()},scrollStepsStepForward:function(){this.api.scrollStepsStepForward()},scrollToKey:function(a){this.api.scrollToKey(a)},scrollToStep:function(a){this.api.scrollToStep(a)},selectStepContents:function(a,b,c){this.api.scrollToStep(a,b,c)},setName:function(a){this.api.setName(a)},setStep:function(a,b,c){this.api.setStep(a,b,c)},setStepSize:function(a){this.api.setStepSize(a)},toggleStep:function(a,b,c){this.api.setStep(a,b,c)}},{create:function(a){return new g(a)}});a.bitbone||(a.bitbone={}),a.bitbone.Clip=g}(this,host,Backbone,_),function(a,b,c,d){"use strict";var e=c.Model.extend({initialize:function(a,b,c){this.initModulationSource(a,b,c),this.api=c,this.initialized=!0},initModulationSource:function(a,b,c){var e=this;c.addIsMappingObserver(function(a){e.set("mapping",a,{observed:!0})}),this.on("change:mapping",function(a,b,c){c.observed||this.initialized&&this.api.toggleMapping()}),c.addNameObserver(d.isNumber(b.nameMaxChars)?b.nameMaxChars:12,d.isString(b.nameFallback)?b.nameFallback:"",function(a){e.set("name",a,{observed:!0})})},toggleMapping:function(){this.api.toggleMapping()}},{create:function(a,b){return new e(null,b,a)}}),f=c.Collection.extend({model:e});a.bitbone||(a.bitbone={}),a.bitbone.ModulationSource=e,a.bitbone.ModulationSourceCollection=f}(this,host,Backbone,_),function(a,b,c,d){"use strict";var e=a.bitbone.AutomatableRangedValue,f=a.bitbone.ModulationSource,g=c.Model.extend({initialize:function(a,b,c){this.initMacro(a,b,c),this.api=c,this.initialized=!0},initMacro:function(a,b,c){var g=this;c.addLabelObserver(d.isNumber(b.labelMaxChars)?b.labelMaxChars:12,d.isString(b.labelFallback)?b.labelFallback:"",function(a){g.set("label",a,{observed:!0})}),this.set("amount",e.create(c.getAmount(),b)),this.set("modulationSource",f.create(c.getModulationSource()))}},{create:function(a,b){return new g(null,b,a)}}),h=c.Collection.extend({model:g});a.bitbone||(a.bitbone={}),a.bitbone.Macro=g,a.bitbone.MacroCollection=h}(this,host,Backbone,_),function(a,b,c,d){"use strict";var e=a.bitbone.AutomatableRangedValue,f=a.bitbone.AutomatableRangedValueCollection,g=a.bitbone.Macro,h=a.bitbone.MacroCollection,i=a.bitbone.ModulationSource,j=a.bitbone.ModulationSourceCollection,k=c.Model.extend({initialize:function(a,b,c){this.initDevice(a,b,c),this.api=c,this.initialized=!0},initDevice:function(a,b,c){var k,l,m=this;for(c.addActiveModulationSourceObserver(d.isNumber(b.modulationSourceMaxChars)?b.modulationSourceMaxChars:12,d.isString(b.modulationSourceFallback)?b.modulationSourceFallback:"",function(a){m.set("activeModulationSource",a,{observed:!0})}),c.addHasSelectedDeviceObserver(function(a){m.set("hasSelectedDevice",a,{observed:!0})}),c.addIsEnabledObserver(function(a){m.set("enabled",a,{observed:!0})}),c.addNameObserver(d.isNumber(b.nameMaxChars)?b.nameMaxChars:12,d.isString(b.nameFallback)?b.nameFallback:"",function(a){m.set("name",a,{observed:!0})}),c.addNextParameterPageEnabledObserver(function(a){m.set("nextParameterPageEnabled",a,{observed:!0})}),c.addPreviousParameterPageEnabledObserver(function(a){m.set("previousParameterPageEnabled",a,{observed:!0})}),c.addPageNamesObserver(function(){m.set("pageNames",arguments,{observed:!0})}),c.addSelectedPageObserver(-1,function(a){m.set("selectedPage",a,{observed:!0})}),c.addPresetCategoriesObserver(function(){m.set("presetCategories",arguments,{observed:!0})}),c.addPresetCategoryObserver(d.isNumber(b.presetCategoryMaxChars)?b.presetCategoryaxChars:12,d.isString(b.presetCategoryFallback)?b.presetCategoryFallback:"",function(a){m.set("presetCategory",a,{observed:!0})}),c.addPresetCreatorsObserver(function(){m.set("presetCreators",arguments,{observed:!0})}),c.addPresetCreatorObserver(d.isNumber(b.presetCreatorMaxChars)?b.presetCreatoraxChars:12,d.isString(b.presetCreatorFallback)?b.presetCreatorFallback:"",function(a){m.set("presetCreator",a,{observed:!0})}),l=new f,k=0;8>k;k++)l.add(e.create(c.getCommonParameter(k)));for(this.set("commonParameters",l),l=new f,k=0;8>k;k++)l.add(e.create(c.getEnvelopeParameter(k)));for(this.set("envelopeParameters",l),l=new h,k=0;8>k;k++)l.add(g.create(c.getMacro(k)));for(this.set("macros",l),l=new j,k=0;8>k;k++)l.add(i.create(c.getModulationSource(k)));for(this.set("modulationSources",l),l=new f,k=0;8>k;k++)l.add(e.create(c.getParameter(k)));this.set("parameters",l)},mextParameterPage:function(){this.api.nextParamaterPage()},previousParameterPage:function(){this.api.previousParameterPage()},setParameterPage:function(a){this.api.setParameterPage(a)},setPresetCategory:function(a){this.api.setPresetCategory(a)},setPresetCreator:function(a){this.api.setPresetCreator(a)},switchToNextPreset:function(a){this.api.switchToNextPreset(a)},switchToPreviousPreset:function(a){this.api.switchToPreviousPreset(a)},switchToNextPresetCategory:function(a){this.api.switchToNextPresetCategory(a)},switchToPreviousPresetCategory:function(a){this.api.switchToPreviousPresetCategory(a)},switchToNextPresetCreator:function(a){this.api.switchToNextPresetCreator(a)},switchToPreviousPresetCreator:function(a){this.api.switchToPreviousPresetCreator(a)},toggleEnableState:function(a){this.api.toggleEnableState(a)}},{create:function(a,b){return new k(void 0,b,a)}});a.bitbone||(a.bitbone={}),a.bitbone.Device=k}(this,host,Backbone,_),function(a,b){"use strict";var c=a.bitbone.Device,d=c.extend({initialize:function(a,c){var d=b.createCursorDevice();this.initCursorDevice(a,c,d),this.api=d,this.initialized=!0},initCursorDevice:function(a,b,c){var d=this;this.initDevice(a,b,c),c.addCanSelectNextObserver(function(a){d.set("canSelectNext",a,{observed:!0})}),c.addCanSelectPreviousObserver(function(a){d.set("canSelectPrevious",a,{observed:!0})})},selectNext:function(){this.api.selectNext()},selectPrevious:function(){this.api.selectPrevious()}},{create:function(a){return new d(a)}});a.bitbone||(a.bitbone={}),a.bitbone.CursorDevice=d}(this,host,Backbone,_),function(a,b,c){"use strict";var d=a.bitbone.BooleanValue,e=c.Model.extend({initialize:function(a,b,c){this.initSourceSelector(a,b,c),this.api=c,this.initialized=!0},initSourceSelector:function(a,b,c){this.set("hasAudioInputSelected",d.create(c.getHasAudioInputSelected())),this.set("hasNoteInputSelected",d.create(c.getHasNoteInputSelected()))}},{create:function(a,b){return new e(void 0,b,a)}});a.bitbone||(a.bitbone={}),a.bitbone.SourceSelector=e}(this,host,Backbone,_),function(a,b,c,d){"use strict";var e=a.bitbone.Channel,f=a.bitbone.BooleanValue,g=a.bitbone.ClipLauncherSlots,h=a.bitbone.Device,i=a.bitbone.SourceSelector,j=e.extend({initialize:function(a,b,c){this.initTrack(a,b,c),this.api=c,this.initialized=!0},initTrack:function(a,b,e){var j=this;this.initChannel(a,b,e),this.on("change:name",function(a,b,c){c.observed||this.initialized&&this.api.setName(b)}),b.usePitchNames&&(this.set("pitchNames",new c.Collection),e.addPitchNamesObserver(function(a,b){j.add({id:a,name:b})})),e.addTrackTypeObserver(d.isNumber(b.trackTypeMaxChars)?b.trackTypeMaxChars:6,d.isNumber(b.trackTypeFallback)?b.trackTypeFallback:"",function(a){j.set("trackType",a)}),this.set("arm",f.create(e.getArm())),this.set("canHoldAudioData",f.create(e.getCanHoldAudioData())),this.set("canHoldNoteData",f.create(e.getCanHoldNoteData())),this.set("clipLauncherSlots",g.create(e.getClipLauncherSlots())),this.set("matrixQueuedForStop",f.create(e.getIsMatrixQueuedForStop())),this.set("matrixStoped",f.create(e.getIsMatrixStopped())),this.set("primaryDevice",h.create(e.getPrimaryDevice())),this.set("sourceSelector",i.create(e.getSourceSelector()))},playNote:function(a,b){this.api.playNote(a,b)},returnToArrangement:function(){this.api.returnToArrangement()},startNote:function(a,b){this.api.startNote(a,b)},stop:function(){this.api.stop()},stopNote:function(a,b){this.api.stopNote(a,b)}},{create:function(a,b){return new j(void 0,b,a)}}),k=c.Collection.extend({model:j});a.bitbone||(a.bitbone={}),a.bitbone.Track=j,a.bitbone.TrackCollection=k}(this,host,Backbone,_),function(a,b,c,d){"use strict";var e=a.bitbone.Track,f=e.extend({initialize:function(a,c){var e=b.createCursorTrack(d.isNumber(c.numSends)?c.numSends:8,d.isNumber(c.numScenes)?c.numScenes:8);this.initCursorTrack(a,c,e),this.api=e,this.initialized=!0},initCursorTrack:function(a,b,c){this.initTrack(a,b,c)},selectNext:function(){this.api.selectNext()},selectPrevious:function(){this.api.selectPrevious()}},{create:function(a){return new f(void 0,a)}});a.bitbone||(a.bitbone={}),a.bitbone.CursorTrack=f}(this,host,Backbone,_),function(a,b,c){"use strict";var d=a.bitbone.AutomatableRangedValue,e=c.Model.extend({initialize:function(a,c){var d=b.createGroove();this.initGroove(a,c,d),this.api=d,this.initialized=!0},initGroove:function(a,b,c){this.set("accentAmount",d.create(c.getAccentAmount(),{range:b.accentAmountRange})),this.set("accentRate",d.create(c.getAccentRate(),{range:b.accentRateRange})),this.set("accentPhase",d.create(c.getAccentPhase(),{range:b.accentPhaseRange})),this.set("shuffleAmount",d.create(c.getShuffleAmount(),{range:b.shuffleAmountRange})),this.set("shuffleRate",d.create(c.getShuffleRate(),{range:b.shuffleRateRange})),this.set("enabled",d.create(c.getEnabled()))}},{create:function(a){return new e(null,a)}});a.bitbone||(a.bitbone={}),a.bitbone.Groove=e}(this,host,Backbone,_),function(a,b,c,d){"use strict";var e=c.Model.extend({initialize:function(a,c){var e=b.createMixer(d.isString(c.perspective)?c.perspective:"",d.isNumber(c.screenIndex)?c.screenIndex:0);this.initMixer(a,c,e),this.api=e,this.initialized=!0},initMixer:function(a,b,c){var d=this;c.addClipLauncherSectionVisibilityObserver(function(a){d.set("clipLauncherSectionVisibility",a,{observed:!0})}),this.on("change:clipLauncherSectionVisibility",function(a,b,c){c.observed||this.initialized&&this.toggleClipLauncherSectionVisibility()}),c.addCrossFadeSectionVisibilityObserver(function(a){d.set("crossFadeSectionVisibility",a,{observed:!0})}),this.on("change:crossFadeSectionVisibility",function(a,b,c){c.observed||this.initialized&&this.toggleCrossFadeSectionVisibility()}),c.addDeviceSectionVisibilityObserver(function(a){d.set("deviceSectionVisibility",a,{observed:!0})}),this.on("change:deviceSectionVisibility",function(a,b,c){c.observed||this.initialized&&this.toggleDeviceSectionVisibility()}),c.addIoSectionVisibilityObserver(function(a){d.set("ioSectionVisibility",a,{observed:!0})}),this.on("change:ioSectionVisibility",function(a,b,c){c.observed||this.initialized&&this.toggleIoSectionVisibility()}),c.addMeterSectionVisibilityObserver(function(a){d.set("meterSectionVisibility",a,{observed:!0})}),this.on("change:meterSectionVisibility",function(a,b,c){c.observed||this.initialized&&this.toggleMeterSectionVisibility()}),c.addSendsSectionVisibilityObserver(function(a){d.set("sendsSectionVisibility",a,{observed:!0})}),this.on("change:sendsSectionVisibility",function(a,b,c){c.observed||this.initialized&&this.toggleSendsSectionVisibility()})},toggleClipLauncherSectionVisibility:function(){this.api.toggleClipLauncherSectionVisibility()},toggleCrossFadeSectionVisibility:function(){this.api.toggleCrossFadeSectionVisibility()},toggleDeviceSectionVisibility:function(){this.api.toggleDeviceSectionVisibility()},toggleIoSectionVisibility:function(){this.api.toggleIoSectionVisibility()},toggleMeterSectionVisibility:function(){this.api.toggleMeterSectionVisibility()},toggleSendsSectionVisibility:function(){this.api.toggleSendsSectionVisibility()}},{create:function(a){return new e(void 0,a)}});a.bitbone||(a.bitbone={}),a.bitbone.Mixier=e}(this,host,Backbone,_),function(a){"use strict";{var b=a.bitbone.Device,c=a.ChainLocation,d=a.DeviceType;b.extend({initialize:function(a,b,c){this.initPrimaryDevice(a,b,c),this.api=c,this.initialized=!0},initPrimaryDevice:function(a,b,e){var f=this;this.initDevice(a,b,e),e.addCanSwitchToDeviceObserver(d.ANY,c.FIRST,function(a){f.set("canSwithcToFirst",a,{observed:!0})}),e.addCanSwitchToDeviceObserver(d.ANY,c.LAST,function(a){f.set("canSwithcToLast",a,{observed:!0})}),e.addCanSwitchToDeviceObserver(d.ANY,c.LAST,function(a){f.set("canSwithcToNext",a,{observed:!0})}),e.addCanSwitchToDeviceObserver(d.ANY,c.PREVIOUS,function(a){f.set("canSwithcToPrevious",a,{observed:!0})})},switchToDeviceFirst:function(){this.api.switchToDevice(d.ANY,c.FISRT)},switchToDeviceLast:function(){this.api.switchToDevice(d.ANY,c.LAST)},switchToDeviceNext:function(){this.api.switchToDevice(d.ANY,c.NEXT)},switchToDevicePrevious:function(){this.api.switchToDevice(d.ANY,c.Previous)}},{create:function(a,c){return new b(void 0,c,a)}})}a.bitbone||(a.bitbone={}),a.bitbone.Device=b}(this,host,Backbone,_),function(a,b,c,d){"use strict";var e=a.bitbone.Track,f=a.bitbone.TrackCollection,g=a.bitbone.ClipLauncherScenesOrSlots,h=c.Model.extend({model:e,initialize:function(a,c){var e=d.isNumber(c.numTracks)?c.numTracks:8,f=d.isNumber(c.numSends)?c.numSends:8,g=d.isNumber(c.numScenes)?c.numScenes:8,h=c.main?b.createMainTrackBank(e,f,g):b.createTrackBank(e,f,g);this.initTrackBank(a,c,h),this.api=h,this.initialized=!0},initTrackBank:function(a,b,c){{var h=this,i=d.isNumber(b.numTracks)?b.numTracks:8;d.isNumber(b.numSends)?b.numSends:8,d.isNumber(b.numScenes)?b.numScenes:8}c.addCanScrollScenesDownObserver(function(a){h.set("canScrollScenesDown",a,{observed:!0})}),c.addCanScrollScenesUpObserver(function(a){h.set("canScrollScenesUp",a,{observed:!0})}),c.addCanScrollSendsDownObserver(function(a){h.set("canScrollSendsDown",a,{observed:!0})}),c.addCanScrollSendsUpObserver(function(a){h.set("canScrollSendsUp",a,{observed:!0})}),c.addCanScrollTracksDownObserver(function(a){h.set("canScrollTracksDown",a,{observed:!0})}),c.addCanScrollTracksUpObserver(function(a){h.set("canScrollTracksUp",a,{observed:!0})}),c.addSceneScrollPositionObserver(function(a){h.set("sceneScrollPosition",a,{observed:!0})},-1),c.addTrackScrollPositionObserver(function(a){h.set("trackScrollPosition",a,{observed:!0})},-1);var j=d.isNumber(b.trackScrollStepSize)?b.trackScrollStepSize:1;c.setTrackScrollStepSize(j),this.set("trackScrollStepSize",j),this.on("change:trackScrollStepSize",function(a,b,c){c.observed||this.initialized&&this.api.setTrackScrollStepSize(b)}),this.set("clipLauncherScenes",g.create(c.getClipLauncherScenes()));for(var k=new f,l=0;i>l;l++)k.add(e.create(c.getTrack(l)));this.set("tracks",k)},launchScenes:function(a){this.api.lacunhScenes(a)},scrollScenesDown:function(){this.api.scrollScenesDown()},scrollScenesPageDown:function(){this.api.scrollScenesPageDown()},scrollScenesPageUp:function(){this.api.scrollScenesPageUp()},scrollScenesUp:function(){this.api.scrollScenesUp()},scrollSendsDown:function(){this.api.scrollSendsDown()},scrollSendsPageDown:function(){this.api.scrollSendsPageDown()},scrollSendsPageUp:function(){this.api.scrollSendsPageUp()},scrollSendsUp:function(){this.api.scrollSendsUp()},scrollToScene:function(a){this.api.scrollToScene(a)},scrollToTrack:function(a){this.api.scrollToTrack(a)},scrollTracksDown:function(){this.api.scrollTracksDown()},scrollTracksPageDown:function(){this.api.scrollTracksPageDown()},scrollTracksPageUp:function(){this.api.scrollTracksPageUp()},scrollTracksUp:function(){this.api.scrollTracksUp()}},{create:function(a){return new h(void 0,a)}});a.bitbone||(a.bitbone={}),a.bitbone.TrackBank=h}(this,host,Backbone,_),function(a,b,c,d){"use strict";var e=a.bitbone.BeatTime,f=a.bitbone.RangedValue,g=c.Model.extend({initialize:function(a,c){var d=b.createTransport();this.initTransport(a,c,d),this.api=d,this.initialized=!0},initTransport:function(a,b,c){var g=this;c.addAutomationOverrideObserver(function(a){g.set("automationOverride",a)}),c.addAutomationWriteModeObserver(function(a){g.set("automationWriteMode",a,{observed:!0})}),this.on("change:automationWriteMode",function(a,b,d){d.observed||this.initialized&&c.setAutomationWriteMode(b)}),c.addClickObserver(function(a){g.set("click",a,{observed:!0})}),this.on("change:click",function(a,b,c){c.observed||this.initialized&&this.api.setClick(b)}),c.addIsLoopActiveObserver(function(a){g.set("loopActive",a,{observed:!0})}),this.on("change:loopActive",function(a,b,c){c.observed||this.initialized&&this.api.setLoop(b)}),c.addIsPlayingObserver(function(a){g.set("playing",a,{observed:!0})}),this.on("change:playing",function(a,b,c){c.observed||this.initialized&&(b?this.stop():this.play())}),c.addIsRecordingObserver(function(a){g.set("recording",a,{observed:!0})}),this.on("change:recording",function(a,b,c){c.observed||this.initialized&&this.record()}),c.addIsWritingArrangerAutomationObserver(function(a){g.set("writingArrangerAutomation",a,{observed:!0})}),this.on("change:writingArrangerAutomation",function(a,b,c){c.observed||this.initialized&&this.api.toggleWriteArrangerAutomation()}),c.addIsWritingClipLauncherAutomationObserver(function(a){g.set("writingClipLauncherAutomation",a,{observed:!0})}),this.on("change:writingClipLauncherAutomation",function(a,b,c){c.observed||this.initialized&&this.api.toggleWriteClipLauncherAutomation()}),c.addLauncherOverdubObserver(function(a){g.set("launcherOverdub",a,{observed:!0})}),this.on("change:launcherOverdub",function(a,b,c){c.observed||this.initialized&&this.api.setLauncherOverdub(b)}),c.addMetronomeTicksObserver(function(a){g.set("metronomeTicks",a,{observed:!0})}),this.on("change:metronomeTicks",function(a,b,c){c.observed||this.initialized&&this.api.toggleMetronomeTicks()}),c.addMetronomeVolumeObserver(function(a){g.set("metronomeVolume",a,{observed:!0})}),this.on("change:metronomeVolume",function(a,b,c){c.observed||this.initialized&&this.api.setMetronomeValue(b,d.isNumber(c.metronomeVolumeRange)?c.range:128)}),c.addOverdubObserver(function(a){g.set("overdub",a,{observed:!0})}),this.on("change:overdub",function(a,b,c){c.observed||this.initialized&&this.api.setOverdub(b)}),c.addPreRollObserver(function(a){g.set("preRoll",a,{observed:!0})}),c.addPunchInObserver(function(a){g.set("punchIn",a,{observed:!0})}),this.on("change:punchIn",function(a,b,c){c.observed||this.initialized&&this.api.togglePunchIn()}),c.addPunchOutObserver(function(a){g.set("punchOut",a,{observed:!0})}),this.on("change:punchOut",function(a,b,c){c.observed||this.initialized&&this.api.togglePunchOut()}),this.set("inPosition",e.create(c.getInPosition(),b)),this.set("outPosition",e.create(c.getOutPosition(),b)),this.set("position",e.create(c.getPosition(),b)),this.set("tempo",f.create(c.getTempo(),{range:666}))},fastForward:function(){this.get("playing")?(this.stop(),this.api.fastForward(),this.deferredPlay(50)):this.api.fastForward()},incPosition:function(a,b){this.api.incPosition(a,b)},incTempo:function(a,b){this.api.increaseTempo(a,b?64700:647)},incTempoSlow:function(a){this.incTempo(a,!0)},incTempoFast:function(a){this.incTempo(a,!1)},jumpToInPosition:function(){var a=this.get("inPosition").get("rawValue");this.get("playing")?(this.stop(),this.get("position").setRaw(a),this.deferredPlay(50)):this.get("position").setRaw(a)},jumpToOutPosition:function(){var a=this.get("outPosition").get("rawValue");this.get("playing")?(this.stop(),this.get("position").setRaw(a),this.deferredPlay(50)):this.get("position").setRaw(a)},play:function(){this.api.play()},deferredPlay:function(a){var c=this;b.scheduleTask(function(){c.play()},null,a)},record:function(){this.api.record()},resetAutomationOverrides:function(){this.api.resetAutomationOverrides()},rstart:function(){this.api.restart()},returnToArrangement:function(){this.api.returnToArrangement()},rewind:function(){this.get("playing")?(this.stop(),this.api.rewind(),this.deferredPlay(50)):this.api.rewind()},stop:function(){this.api.stop()},toggleClick:function(){this.api.toggleClick()},toggleLatchAutomationWriteMode:function(){this.api.toggleLatchAutomationWriteMode()},toggleLauncherOverdub:function(){this.api.toggleLauncherOverdub()},toggleLoop:function(){this.api.toggleLoop()},toggleMetronomeTicks:function(){this.api.toggleMetronomeTicks()},toggleOverdub:function(){this.api.toggleOverdub()},togglePlay:function(){this.api.togglePlay()},togglePunchIn:function(){this.api.togglePunchIn()},togglePunchOut:function(){this.api.togglePunchOut()},toggleWriteArrangerAutomation:function(){this.api.toggleWriteArrangerAutomation()},toggleWriteClipLauncherAutomation:function(){this.api.toggleWriteClipLauncherAutomation()}},{create:function(a){return new g(a)}});a.bitbone||(a.bitbone={}),a.bitbone.Transport=g}(this,this.host,this.Backbone,this._),function(a,b){"use strict";var c=a.bitbone.AutomatableRangedValue,d=a.bitbone.AutomatableRangedValueCollection,e=d.extend({initialize:function(a,c,d){var e=b.createUserControls(d);
this.initUserControlBank(a,c,e,d),this.api=e,this.initialized=!0},initUserControlBank:function(a,b,d,e){for(var f=0;e>f;f++)this.add(c.create(d.getControl(f)))}},{create:function(a,b){return new e(void 0,b,a)}});a.bitbone||(a.bitbone={}),a.bitbone.UserControlBank=e}(this,host,Backbone,_);