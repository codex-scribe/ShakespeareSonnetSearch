const sonnetsData = [
  {
    number: 1,
    text: `From fairest creatures we desire increase,
That thereby beauty’s rose might never die,
But as the riper should by time decease,
His tender heir might bear his memory:
But thou, contracted to thine own bright eyes,
Feed’st thy light’s flame with self-substantial fuel,
Making a famine where abundance lies,
Thyself thy foe, to thy sweet self too cruel.
Thou that art now the world’s fresh ornament,
And only herald to the gaudy spring,
Within thine own bud buriest thy content,
And, tender churl, mak’st waste in niggarding:
Pity the world, or else this glutton be,
To eat the world’s due, by the grave and thee.`,
    themes: ["beauty","mortality","immortality","imperative to procreation","increase","abundance","waste"],
    imagery: ["flowers","rose","body parts","face","eyes","fire","seasons","spring","buds"],
    characters: ["Fair Youth"]
  },
  {
    number: 2,
    text: `When forty winters shall besiege thy brow,
And dig deep trenches in thy beauty’s field,
Thy youth’s proud livery so gazed on now
Will be a tottered weed of small worth held: 
Then being asked, where all thy beauty lies,
Where all the treasure of thy lusty days, 
To say within thine own deep-sunken eyes
Were an all-eating shame, and thriftless praise.
How much more praise deserved thy beauty’s use,
If thou couldst answer, “This fair child of mine
Shall sum my count, and make my old excuse,”
Proving his beauty by succession thine.
This were to be new made when thou art old,
And see thy blood warm when thou feel’st it cold.`,
    themes: ["beauty","imperative to procreation","immortality"],
    imagery: ["winter","seasons","brow","face","clothing","eyes","blood","body parts","wrinkles","heat","cold"],
    characters: ["Fair Youth"]
  },
  {
    number: 3,
    text: `Look in thy glass and tell the face thou viewest,
Now is the time that face should form another,
Whose fresh repair if now thou not renewest,
Thou dost beguile the world, unbless some mother.
For where is she so fair whose uneared womb
Disdains the tillage of thy husbandry?
Or who is he so fond will be the tomb
Of his self-love to stop posterity? 
Thou art thy mother’s glass, and she in thee
Calls back the lovely April of her prime;
So thou through windows of thine age shalt see,
Despite of wrinkles, this thy golden time.
But if thou live rememb'red not to be,
Die single, and thine image dies with thee.`,
    themes: ["imperative to procreation","mortality","beauty","passage of time"],
    imagery: ["mirror","face","months","April","spring","seasons","gold","wrinkles","body parts"],
    characters: ["Fair Youth"]
  },
  {
    number: 4,
    text: `Unthrifty loveliness, why dost thou spend
Upon thyself thy beauty’s legacy?
Nature’s bequest gives nothing, but doth lend,
And being frank she lends to those are free:
Then, beauteous niggard, why dost thou abuse
The bounteous largess given thee to give?
Profitless usurer, why dost thou use
So great a sum of sums yet canst not live?
For having traffic with thyself alone,
Thou of thyself thy sweet self dost deceive:
Then how when Nature calls thee to be gone,
What acceptable audit canst thou leave?
Thy unused beauty must be tombed with thee,
Which usèd lives th’executor to be.`,
    themes: ["beauty","lending/debt","imperative to procreation","mortality","waste"],
    imagery: ["grave/tomb"],
    characters: ["Fair Youth"]
  },
  {
    number: 5,
    text: `Those hours that with gentle work did frame
The lovely gaze where every eye doth dwell
Will play the tyrants to the very same,
And that unfair which fairly doth excel;
For never-resting time leads summer on
To hideous winter and confounds him there,
Sap checked with frost and lusty leaves quite gone,
Beauty o’ersnowed and bareness every where:
Then were not summer’s distillation left
A liquid prisoner pent in walls of glass,
Beauty’s effect with beauty were bereft,
Nor it, nor no remembrance what it was.
But flowers distilled, though they with winter meet,
Leese but their show; their substance still lives sweet.`,
    themes: ["beauty","tyranny","mortality","imperative to procreation"],
    imagery: ["face","seasons","winter","summer","trees","sap","frost","leaves","snow","weather","perfume","flowers","body parts","gaze","barrenness (trees)"],
    characters: ["Fair Youth"]
  },
  {
    number: 6,
    text: `Then let not winter’s ragged hand deface
In thee thy summer ere thou be distilled:
Make sweet some vial; treasure thou some place
With beauty’s treasure ere it be self-killed:
That use is not forbidden usury
Which happies those that pay the willing loan;
That’s for thyself to breed another thee,
Or ten times happier be it ten for one;
Ten times thyself were happier than thou art,
If ten of thine ten times refigured thee:
Then what could death do if thou shouldst depart,
Leaving thee living in posterity?
Be not self-willed, for thou art much too fair
To be death’s conquest and make worms thine heir.`,
    themes: ["mortality","immortality","imperative to procreation","beauty","lending/debt"],
    imagery: ["winter","summer","seasons","perfume","worms","treasure"],
    characters: ["Fair Youth"]
  },
  {
    number: 7,
    text: `Lo in the orient when the gracious light
Lifts up his burning head, each under eye
Doth homage to his new-appearing sight,
Serving with looks his sacred majesty; 
And having climbed the steep-up heavenly hill,
Resembling strong youth in his middle age,
Yet mortal looks adore his beauty still,
Attending on his golden pilgrimage:
But when from highmost pitch, with weary car
Like feeble age he reeleth from the day,
The eyes  (fore duteous) now converted are
From his low tract and look another way:
So thou, thyself outgoing in thy noon,
Unlooked on diest unless thou get a son.`,
    themes: ["beauty","passage of time","imperative to procreation","youth","old age","mortality"],
    imagery: ["sun","gold","gaze","time of day","day"],
    characters: ["Fair Youth"]
  },
  {
    number: 8,
    text: `Music to hear, why hear’st thou music sadly?
Sweets with sweets war not, joy delights in joy:
Why lov’st thou that which thou receiv’st not gladly,
Or else receiv’st with pleasure thine annoy?
If the true concord of well-tunèd sounds
By unions married do offend thine ear,
They do but sweetly chide thee, who confounds
In singleness the parts that thou shouldst bear; 
Mark how one string, sweet husband to another,
Strikes each in each by mutual ordering;
Resembling sire, and child, and happy mother,
Who all in one, one pleasing note do sing;
Whose speechless song being many, seeming one,
Sings this to thee, “Thou single wilt prove none.”`,
    themes: ["imperative to procreation"],
    imagery: ["music"],
    characters: ["Fair Youth"]
  },
  {
    number: 9,
    text: `Is it for fear to wet a widow’s eye
That thou consum’st thyself in single life?
Ah! if thou issueless shalt hap to die,
The world will wail thee like a makeless wife,
The world will be thy widow and still weep,
That thou no form of thee hast left behind,
When every private widow well may keep,
By children’s eyes, her husband’s shape in mind:
Look what an unthrift in the world doth spend
Shifts but his place, for still the world enjoys it,
But beauty’s waste hath in the world an end,
And kept unused, the user so destroys it:
No love toward others in that bosom sits
That on himself such murd’rous shame commits.`,
    themes: ["imperative to procreation","mortality","grief","beauty","waste","shame"],
    imagery: ["widow","weeping","gaze","eyes","face","body parts"],
    characters: ["Fair Youth"]
  },
  {
    number: 10,
    text: `For shame deny that thou bear’st love to any,
Who for thy self art so unprovident.
Grant, if thou wilt, thou art beloved of many,
But that thou none lov’st is most evident;
For thou art so possessed with murd’rous hate,
That ’gainst thy self thou stick’st not to conspire,
Seeking that beauteous roof to ruinate
Which to repair should be thy chief desire:
O change thy thought, that I may change my mind!
Shall hate be fairer lodged than gentle love?
Be as thy presence is, gracious and kind,
Or to thy self at least kind-hearted prove:
Make thee another self for love of me,
That beauty still may live in thine or thee.`,
    themes: ["shame","waste","beauty","imperative to procreation","hate","immortality"],
    imagery: ["house"],
    characters: ["Fair Youth"]
  }]
  
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { sonnetsData };
}
