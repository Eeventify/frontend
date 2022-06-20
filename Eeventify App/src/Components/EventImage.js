function EventImage(interestId) {
    const images = {
        "1":"https://www.kinetic-revolution.com/wp-content/uploads/2016/10/beer-blue-sky-m.jpg",
        "3":"https://ae.tejar.com/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/c/o/corsair_one_compact_gaming_pc19_-_tejar.jpg",
        "4":"https://s3-eu-west-2.amazonaws.com/realbusinessda/wp-content/uploads/2017/01/shutterstock_555863836.jpg",
        "5":"https://www.eschoolnews.com/files/2015/12/coding1.jpg",
        "6":"https://www.ox.ac.uk/sites/files/oxford/field/field_image_main/learning.jpg",
        "7":"https://frothers.com.au/wp-content/uploads/2014/11/seandavey007-1.jpg",
        "8":"https://peopleknowhow.org/wp-content/uploads/2019/09/Walking-Befriending-Img.jpg",
        "9":"https://www.iselect.com.au/content/uploads/2019/08/Travelling-guide-tips.png",
        "20013":"https://www.liquor.com/thmb/MfGtUDc7VMgXTCYrTeIP7gTyKtQ=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__liquor__2018__06__19130210__wheelmisfortune-755c40fd4391455592b477d0c3fd14ab.jpg",
        "20014":"http://geekandsundry.com/wp-content/uploads/2015/05/catan-board-970x545.png"
    }

    if (interestId in images) { return images[interestId]; }
    else { return "https://standardsolar.com/wp-content/uploads/2019/03/greenfield-scaled.jpeg"; }
}

export default EventImage;
