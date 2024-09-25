import TableLinks from "@/app/(pages)/tbl_data/[db]/[table]/TableLinks";
import Table from "./Table";
import FormCompare from "@/app/(pages)/tbl_data/[db]/[table]/FormCompare";
import Actions from "./Actions";
import {tblDataPage} from "@/app/ui/actions";

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `${params.table} < ${params.db}`
  }
}

export default async function Page({params, searchParams}) {

  let get = {
    db: params.db,
    table: params.table,
    order: searchParams.order,
    go: searchParams.go,
  };
  let props = await tblDataPage(get)


  /*componentDidMount() {
    jQuery('.contentTable TD').click(function(){
      var tr = jQuery(this).parent();
      var ch = tr.find('input').prop('checked');
      if (jQuery(this).index() == 0) {
        tr.toggleClass('selectedRow', ch);
        return true;
      }
      tr.toggleClass('selectedRow', !ch);
      jQuery(this).parent().find('input').attr('checked', !ch)
    });

    jQuery('.contentTable TR').dblclick(function(){
      location.href = jQuery(this).find('a').attr('href');
    });

    jQuery('.contentTable TD').click(function(){
      if (jQuery(this).index() <= 2) {
        return true;
      }
      if (globalCtrlKeyMode) {
        jQuery(this).html('<input type="text" value="'+jQuery(this).html()+'" id="editable">');
        jQuery('#editable').focus();
        jQuery('#editable').focusout(function() {
          var html = jQuery(this).val();
          jQuery(this).parent().html(html);
        });
      }
      return true;
    });
  }*/


  return (
    <div>

      <h1>Таблица: {params.table} ({props.part > props.count ? props.count : props.part} строк из {props.count} всего)</h1>

      <form action="/tbl_data" method="post" name="formTableRows" id="formTableRows">
        <input type="hidden" name="rowMulty" value="1" />
        <input type="hidden" name="action" value="" />

        <TableLinks {...props} />

        <Table {...props} />

        <Actions />
      </form>
      <FormCompare {...props} />
    </div>
  );

}
