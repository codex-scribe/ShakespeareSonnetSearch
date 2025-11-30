// Shakespeare's Sonnets Data
// This file contains all 154 sonnets with metadata for searching

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
Thy self thy foe, to thy sweet self too cruel:
Thou that art now the world’s fresh ornament,
And only herald to the gaudy spring,
Within thine own bud buriest thy content,
And, tender churl, mak’st waste in niggarding:
Pity the world, or else this glutton be,
To eat the world’s due, by the grave and thee.`,
    themes: ['beauty', 'youth', 'imperative to procreation'],
    imagery: ['flowers', 'body parts', 'face', 'eyes', 'rose'],
    characters: []
  },
  {
    number: 2,
    text: `When forty winters shall besiege thy brow,
And dig deep trenches in thy beauty's field,
Thy youth's proud livery so gazed on now,
Will be a tatter'd weed of small worth held:
Then being asked, where all thy beauty lies,
Where all the treasure of thy lusty days;
To say within thine own deep sunken eyes,
Were an all-eating shame, and thriftless praise.
How much more praise deserv'd thy beauty's use,
If thou couldst answer 'This fair child of mine
Shall sum my count, and make my old excuse'
Proving his beauty by succession thine.
This were to be new made when thou art old,
And see thy blood warm when thou feel'st it cold.`,
    themes: ['age', 'youth', 'beauty', 'time'],
    imagery: ['body parts', 'nature', 'face', 'brow', 'eyes'],
    characters: []
  },
  {
    number: 3,
    text: `Look in thy glass and tell the face thou viewest
Now is the time that face should form another;
Whose fresh repair if now thou not renewest,
Thou dost beguile the world, unbless some mother.
For where is she so fair whose unear'd womb
Disdains the tillage of thy husbandry?
Or who is he so fond will be the tomb
Of his self-love to stop posterity?
Thou art thy mother's glass and she in thee
Calls back the lovely April of her prime;
So thou through windows of thine age shalt see,
Despite of wrinkles this thy golden time.
But if thou live, remember'd not to be,
Die single and thine image dies with thee.`,
    themes: ['reproduction', 'beauty', 'time', 'youth'],
    imagery: ['body parts', 'nature', 'face'],
    characters: []
  },
  {
    number: 18,
    text: `Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date:
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm'd,
And every fair from fair sometime declines,
By chance, or nature's changing course untrimm'd:
But thy eternal summer shall not fade,
Nor lose possession of that fair thou ow'st,
Nor shall death brag thou wander'st in his shade,
When in eternal lines to time thou grow'st,
So long as men can breathe, or eyes can see,
So long lives this, and this gives life to thee.`,
    themes: ['beauty', 'immortality', 'time', 'death'],
    imagery: ['nature', 'flowers', 'seasons'],
    characters: []
  },
  {
    number: 29,
    text: `When in disgrace with fortune and men's eyes
I all alone beweep my outcast state,
And trouble deaf heaven with my bootless cries,
And look upon myself, and curse my fate,
Wishing me like to one more rich in hope,
Featur'd like him, like him with friends possess'd,
Desiring this man's art, and that man's scope,
With what I most enjoy contented least;
Yet in these thoughts myself almost despising,
Haply I think on thee, and then my state,
Like to the lark at break of day arising
From sullen earth, sings hymns at heaven's gate;
For thy sweet love remember'd such wealth brings
That then I scorn to change my state with kings.`,
    themes: ['love', 'despair', 'hope', 'fortune'],
    imagery: ['nature', 'birds'],
    characters: []
  },
  {
    number: 30,
    text: `When to the sessions of sweet silent thought
I summon up remembrance of things past,
I sigh the lack of many a thing I sought,
And with old woes new wail my dear time's waste:
Then can I drown an eye, unus'd to flow,
For precious friends hid in death's dateless night,
And weep afresh love's long since cancell'd woe,
And moan the expense of many a vanish'd sight:
Then can I grieve at grievances foregone,
And heavily from woe to woe tell o'er
The sad account of fore-bemoaned moan,
Which I new pay as if not paid before.
But if the while I think on thee, dear friend,
All losses are restor'd, and sorrows end.`,
    themes: ['death', 'memory', 'loss', 'grief', 'love'],
    imagery: ['body parts', 'eyes'],
    characters: []
  },
  {
    number: 55,
    text: `Not marble, nor the gilded monuments
Of princes, shall outlive this powerful rhyme;
But you shall shine more bright in these contents
Than unswept stone, besmear'd with sluttish time.
When wasteful war shall statues overturn,
And broils root out the work of masonry,
Nor Mars his sword, nor war's quick fire shall burn
The living record of your memory.
'Gainst death, and all oblivious enmity
Shall you pace forth; your praise shall still find room
Even in the eyes of all posterity
That wear this world out to the ending doom.
So, till the judgment that yourself arise,
You live in this, and dwell in lovers' eyes.`,
    themes: ['immortality', 'death', 'time', 'war'],
    imagery: ['jewels', 'monuments', 'war'],
    characters: []
  },
  {
    number: 60,
    text: `Like as the waves make towards the pebbled shore,
So do our minutes hasten to their end;
Each changing place with that which goes before,
In sequent toil all forwards do contend.
Nativity, once in the main of light,
Crawls to maturity, wherewith being crown'd,
Crooked eclipses 'gainst his glory fight,
And Time that gave doth now his gift confound.
Time doth transfix the flourish set on youth
And delves the parallels in beauty's brow,
Feeds on the rarities of nature's truth,
And nothing stands but for his scythe to mow:
And yet to times in hope, my verse shall stand,
Praising thy worth, despite his cruel hand.`,
    themes: ['time', 'age', 'youth', 'death'],
    imagery: ['nature', 'water', 'body parts', 'face', 'brow'],
    characters: []
  },
  {
    number: 64,
    text: `When I have seen by Time's fell hand defac'd
The rich-proud cost of outworn buried age;
When sometime lofty towers I see down-raz'd,
And brass eternal slave to mortal rage;
When I have seen the hungry ocean gain
Advantage on the kingdom of the shore,
And the firm soil win of the wat'ry main,
Increasing store with loss, and loss with store;
When I have seen such interchange of state,
Or state itself confounded to decay;
Ruin hath taught me thus to ruminate
That Time will come and take my love away.
This thought is as a death, which cannot choose
But weep to have that which it fears to lose.`,
    themes: ['time', 'death', 'loss', 'ruin', 'decay'],
    imagery: ['nature', 'water', 'monuments'],
    characters: []
  },
  {
    number: 71,
    text: `No longer mourn for me when I am dead
Than you shall hear the surly sullen bell
Give warning to the world that I am fled
From this vile world with vilest worms to dwell:
Nay, if you read this line, remember not
The hand that writ it, for I love you so,
That I in your sweet thoughts would be forgot,
If thinking on me then should make you woe.
O! if, I say, you look upon this verse,
When I perhaps compounded am with clay,
Do not so much as my poor name rehearse,
But let your love even with my life decay;
Lest the wise world should look into your moan,
And mock you with me after I am gone.`,
    themes: ['death', 'grief', 'love', 'mourning'],
    imagery: ['body parts', 'nature', 'hands'],
    characters: []
  },
  {
    number: 73,
    text: `That time of year thou mayst in me behold
When yellow leaves, or none, or few, do hang
Upon those boughs which shake against the cold,
Bare ruin'd choirs, where late the sweet birds sang.
In me thou see'st the twilight of such day
As after sunset fadeth in the west,
Which by and by black night doth take away,
Death's second self, that seals up all in rest.
In me thou see'st the glowing of such fire
That on the ashes of his youth doth lie,
As the death-bed whereon it must expire,
Consum'd with that which it was nourish'd by.
This thou perceiv'st, which makes thy love more strong,
To love that well which thou must leave ere long.`,
    themes: ['age', 'death', 'time', 'love'],
    imagery: ['nature', 'flowers', 'seasons', 'fire'],
    characters: []
  },
  {
    number: 94,
    text: `They that have power to hurt and will do none,
That do not do the thing they most do show,
Who, moving others, are themselves as stone,
Unmoved, cold, and to temptation slow;
They rightly do inherit heaven's graces
And husband nature's riches from expense;
They are the lords and owners of their faces,
Others but stewards of their excellence.
The summer's flower is to the summer sweet,
Though to itself it only live and die,
But if that flower with base infection meet,
The basest weed outbraves his dignity:
For sweetest things turn sourest by their deeds;
Lilies that fester smell far worse than weeds.`,
    themes: ['power', 'beauty', 'corruption', 'nature'],
    imagery: ['flowers', 'nature', 'jewels'],
    characters: []
  },
  {
    number: 116,
    text: `Let me not to the marriage of true minds
Admit impediments. Love is not love
Which alters when it alteration finds,
Or bends with the remover to remove:
O, no! it is an ever-fixed mark,
That looks on tempests and is never shaken;
It is the star to every wandering bark,
Whose worth's unknown, although his height be taken.
Love's not Time's fool, though rosy lips and cheeks
Within his bending sickle's compass come;
Love alters not with his brief hours and weeks,
But bears it out even to the edge of doom.
If this be error and upon me prov'd,
I never writ, nor no man ever lov'd.`,
    themes: ['love', 'constancy', 'time', 'marriage'],
    imagery: ['nature', 'stars', 'body parts', 'face', 'lips', 'cheeks'],
    characters: []
  },
  {
    number: 130,
    text: `My mistress' eyes are nothing like the sun;
Coral is far more red than her lips' red;
If snow be white, why then her breasts are dun;
If hairs be wires, black wires grow on her head.
I have seen roses damask'd, red and white,
But no such roses see I in her cheeks;
And in some perfumes is there more delight
Than in the breath that from my mistress reeks.
I love to hear her speak, yet well I know
That music hath a far more pleasing sound;
I grant I never saw a goddess go;
My mistress, when she walks, treads on the ground:
And yet, by heaven, I think my love as rare
As any she belied with false compare.`,
    themes: ['love', 'beauty', 'realism'],
    imagery: ['body parts', 'flowers', 'jewels', 'nature', 'face', 'eyes', 'lips', 'hair', 'cheeks', 'mouth'],
    characters: []
  },
  {
    number: 138,
    text: `When my love swears that she is made of truth,
I do believe her, though I know she lies,
That she might think me some untutor'd youth,
Unlearned in the world's false subtleties.
Thus vainly thinking that she thinks me young,
Although she knows my days are past the best,
Simply I credit her false-speaking tongue:
On both sides thus is simple truth suppress'd.
But wherefore says she not she is unjust?
And wherefore say not I that I am old?
O, love's best habit is in seeming trust,
And age in love loves not to have years told:
Therefore I lie with her and she with me,
And in our faults by lies we flatter'd be.`,
    themes: ['love', 'age', 'deception', 'truth'],
    imagery: ['body parts', 'mouth'],
    characters: []
  }
];

// Note: This is a sample dataset. For a complete implementation,
// you would include all 154 sonnets with comprehensive metadata.
// The structure supports themes and imagery arrays for flexible searching.

