<!-- Massviews Analysis tool -->
<!-- Copyright 2016 MusikAnimal -->
<!DOCTYPE html>
<html>
  <head>
    <?php include '../_head.php'; ?>
    <title><?php echo $I18N->msg( 'massviews-title' ); ?></title>
  </head>
  <body>
    <div class="container">
      <header class="col-lg-12 text-center">
        <h4>
          <strong>
            <?php echo $I18N->msg( 'massviews-title' ); ?>
          </strong>
          <small class="app-description">
            <?php echo $I18N->msg( 'massviews-description' ); ?>
          </small>
        </h4>
      </header>
      <main class="col-lg-10 col-lg-offset-1">
        <!-- Site notice -->
        <div class="text-center site-notice-wrapper">
          <div class="site-notice">
            <?php include "../_browser_check.php"; ?>
          </div>
        </div>
        <form id="massviews_form">
          <div class="row aqs-row options">
            <!-- Date range selector -->
            <div class="col-lg-4 col-sm-4">
              <label for="range_input">
                <?php echo $I18N->msg( 'dates' ); ?>
              </label>
              <input class="form-control aqs-date-range-selector" id="range_input">
            </div>
            <!-- Advanced options -->
            <div class="col-lg-4 col-sm-4">
              <label for="platform_select">
                <?php echo $I18N->msg( 'platform' ); ?>
              </label>
              <select class="form-control" id="platform_select">
                <option value="all-access">
                  <?php echo $I18N->msg( 'all' ); ?>
                </option>
                <option value="desktop">
                  <?php echo $I18N->msg( 'desktop' ); ?>
                </option>
                <option value="mobile-app">
                  <?php echo $I18N->msg( 'mobile-app' ); ?>
                </option>
                <option value="mobile-web">
                  <?php echo $I18N->msg( 'mobile-web' ); ?>
                </option>
              </select>
            </div>
            <div class="col-lg-4 col-sm-4">
              <label for="agent_select">
                <?php echo $I18N->msg( 'agent' ); ?>
                <a class="help-link" href="/massviews/faq#agents">
                  <span class="glyphicon glyphicon-question-sign"></span>
                </a>
              </label>
              <select class="form-control" id="agent_select">
                <option value="all-agents">
                  <?php echo $I18N->msg( 'all' ); ?>
                </option>
                <option selected="selected" value="user">
                  <?php echo $I18N->msg( 'user' ); ?>
                </option>
                <option value="spider">
                  <?php echo $I18N->msg( 'spider' ); ?>
                </option>
                <option value="bot">
                  <?php echo $I18N->msg( 'bot' ); ?>
                </option>
              </select>
            </div>
          </div>
          <!-- Page Pile input -->
          <div class="row aqs-row">
            <div class="col-lg-12">
              <label for="source_input">
                <?php echo $I18N->msg( 'source' ); ?>
                <a class="help-link" href="/massviews/faq#sources">
                  <span class="glyphicon glyphicon-question-sign"></span>
                </a>
              </label>
              <div class="checkbox pull-right category-subject-toggle">
                <label>
                  <input class="category-subject-toggle--input" type="checkbox">
                    <?php echo $I18N->msg( 'category-subject-toggle' ); ?>
                  </input>
                  <a class="help-link" href="/massviews/faq#category_subject_toggle">
                    <span class="glyphicon glyphicon-question-sign"></span>
                  </a>
                </label>
              </div>
              <div class="input-group clearfix">
                <div class="input-group-btn">
                  <button class="btn btn-default dropdown-toggle" id="source_button" type="button" data-value="category" data-toggle="dropdown" aria-haspopup="true" aria-expand="false">
                    <?php echo $I18N->msg( 'category-url' ); ?>
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="source-option" href="#" data-value="category">
                        <?php echo $I18N->msg( 'category-url' ); ?>
                      </a>
                    </li>
                    <li>
                      <a class="source-option" href="#" data-value="pagepile">
                        <?php echo $I18N->msg( 'page-pile-id' ); ?>
                      </a>
                    </li>
                    <li>
                      <a class="source-option" href="#" data-value="transclusions">
                        <?php echo $I18N->msg( 'template-url' ); ?>
                      </a>
                    </li>
                    <li>
                      <a class="source-option" href="#" data-value="manual" data-target=".manual-entry--modal" data-toggle="modal">
                        <?php echo $I18N->msg( 'manual-entry' ); ?>
                      </a>
                    </li>
                  </ul>
                </div>
                <input class="form-control input-control source-input" id="source_input" min="0" required="required">
                <span class="input-group-btn">
                  <button class="btn btn-primary pull-right">
                    <?php echo $I18N->msg( 'submit' ); ?>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </form>
        <div class="col-lg-5 col-sm-8 center-block progress-bar--wrapper">
          <div class="progress">
            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
          </div>
        </div>
        <output form="massview_form">
          <header class="output-header clearfix">
            <strong class="another-query">
              <span class="glyphicon glyphicon-chevron-left"></span>
              <?php echo $I18N->msg( 'another-query' ); ?>
            </strong>
            <h2 class="tm">
              <a class="massviews-input-name" target="_blank"></a>
              <small class="massviews-params"></small>
              <span class="btn-group view-options pull-right">
                <button class="active btn btn-default view-btn view-btn--list" type="button" href="#" data-value="list">
                  <span class="glyphicon glyphicon-list view-options--list"></span>
                  List
                </button>
                <button class="btn btn-default view-btn view-btn--chart" type="button" href="#" data-value="chart">
                  <span class="glyphicon glyphicon-chart"></span>
                  Chart
                </button>
              </span>
            </h2>
          </header>
          <table class="list-view table table-hover output-table">
            <thead>
              <tr>
                <th>
                  <span>#</span>
                </th>
                <th>
                  <span class="sort-link sort-link--title" data-type="<?php echo 'title'; ?>">
                    <?php echo $I18N->msg( 'page-title' ); ?>
                    <span class="glyphicon glyphicon-sort"></span>
                  </span>
                </th>
                <th>
                  <span class="sort-link sort-link--views" data-type="<?php echo 'views'; ?>">
                    <?php echo $I18N->msg( 'pageviews' ); ?>
                    <span class="glyphicon glyphicon-sort"></span>
                  </span>
                </th>
                <th>
                  <span>
                    <?php echo $I18N->msg( 'average' ); ?>
                  </span>
                </th>
              </tr>
              <tr class="output-totals"></tr>
            </thead>
            <tbody id="mass_list"></tbody>
          </table>
          <div class="chart-view chart-container">
            <canvas class="aqs-chart"></canvas>
          </div>
        </output>
        <div class="message-container col-lg-12"></div>
        <div class="col-lg-12 tm clearfix chart-view" id="chart-legend"></div>
        <!-- Other links -->
        <div class="col-lg-12 data-links">
          <span class="chart-view">
            <a class="js-test-change-chart" data-target="#chart-type-modal" data-toggle="modal" href="#"><span class="glyphicon glyphicon-th"></span>
            <?php echo $I18N->msg( 'change-chart' ); ?></a>
            &nbsp;&bullet;&nbsp;
            <a class="js-test-settings" data-target="#settings-modal" data-toggle="modal" href="#"><span class="glyphicon glyphicon-wrench"></span>
            <?php echo $I18N->msg( 'settings' ); ?></a>
            &nbsp;&bullet;&nbsp;
          </span>
          <a class="permalink" href="/massviews"><span class="glyphicon glyphicon-link"></span>
          <?php echo $I18N->msg( 'permalink' ); ?></a>
          &nbsp;&bullet;&nbsp;
          <span class="glyphicon glyphicon-download-alt"></span>
          <?php $csvlink = "<a class='download-csv' href='#'>" . $I18N->msg( 'csv' ) . "</a>"; ?>
          <?php echo $I18N->msg( 'download', array( 'variables' => array( $csvlink ), 'parsemag' => true ) ); ?>
          &middot;
          <a class="download-json" href="#"><?php echo $I18N->msg( 'json' ); ?></a>
          <time class="elapsed-time pull-right"></time>
        </div>
        <?php $currentApp = "massviews"; ?>
        <?php include "../_footer.php"; ?>
      </main>
      <?php include "../_modals.php"; ?>
      <div class="modal fade manual-entry--modal" role="dialog" tabindex="-1">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button arialabel="Close" class="close" data-dismiss="modal" type="button">
                <span ariahidden="true">&times;</span>
              </button>
              <h4 class="modal-title">
                <?php echo $I18N->msg( 'manual-entry' ); ?>
              </h4>
            </div>
            <form id="manual_entry_form">
              <div class="modal-body">
                <p>
                  <?php echo $I18N->msg( 'manual-entry-instructions' ); ?>
                </p>
                <?php $placeholder = "https://en.wikipedia.org/wiki/Barack_Obama\nhttps://de.wikipedia.org/wiki/John_F._Kennedy\nhttps://ja.wikipedia.org/wiki/セオドア・ルーズベルト"; ?>
                <textarea class="form-control input-control manual-entry--input" rows="8" placeholder="<?php echo $placeholder; ?>" required="required"></textarea>
                <div class="message-container-manual-entry tm"></div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-default manual-entry--cancel" data-dismiss="modal" type="button">
                  <?php echo $I18N->msg( 'cancel' ); ?>
                </button>
                <button class="btn btn-primary manual-entry--submit" type="button">
                  <?php echo $I18N->msg( 'submit' ); ?>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>